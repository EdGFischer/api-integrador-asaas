import { Controller, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AsaasService } from 'src/services/asaas/asaas.service';

@Controller('/client')
export class DeleteClientController {
  constructor(
    private prisma: PrismaService,
    private asaasService: AsaasService,
  ) {}

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new Error('Cliente não encontrado.');
    }

    if (client.asaasCustomerId) {
      try {
        await this.asaasService.deleteCustomer(client.asaasCustomerId);
      } catch (error) {
        console.error('Erro ao deletar cliente no Asaas:', error);
      }
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: 'Cliente excluído com sucesso.' };
  }
}
