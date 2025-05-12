import { Controller, Param, Put, ParseIntPipe, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';

const updateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type UpdateClientBody = z.infer<typeof updateClientSchema>;

@Controller('/client')
export class UpdateClientController {
  constructor(private prisma: PrismaService) {}

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateClientSchema)) body: UpdateClientBody,
  ) {
    const { name, email, address, phone } = body;

    const clientExists = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado.');
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        address: address ?? undefined,
        phone: phone ?? undefined,
      },
    });

    return { updatedClient };
  }
}
