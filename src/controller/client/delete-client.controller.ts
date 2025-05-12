import { Controller, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/client')
export class DeleteClientController {
  constructor(private prisma: PrismaService) {}

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    
    const clientExists = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado.');
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: 'Cliente excluído com sucesso.' };
  }
}
