import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from 'zod'
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { AsaasService } from "@/services/asaas/asaas.service";

const createClientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cnpj: z.string(),
  address: z.string(),
  phone: z.string(),
})

type CreateClientBodySchema = z.infer<typeof createClientBodySchema>

@Controller('/client')
export class CreateClientController {
  constructor(
        private prisma: PrismaService,
        private asaasService: AsaasService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createClientBodySchema) )
  async handle(
    @Body()  body: CreateClientBodySchema
  ) {
    const { 
        name,
        cnpj,
        email,
        address,
        phone
      } = body

      
    const cleanedCnpj = cnpj.replace(/\D/g, '');

    const clientWithSameCNPJ = await this.prisma.client.findUnique({
      where: {
       cnpj: cleanedCnpj,
      }
    })

    if(clientWithSameCNPJ) {
      throw new ConflictException('Client with same CNPJ already exists')
    }

    const clientWithSameEmail = await this.prisma.client.findUnique({
      where: {
       email,
      }
    })
    
    if(clientWithSameEmail) {
      throw new ConflictException('Client with same E-mail already exists')
    }

    const asaasCustomer = await this.asaasService.createCustomer({
      name,
      email,
      cpfCnpj: cnpj,
      phone,
      address,
    });

    await this.prisma.client.create({
      data: {
        name,
        cnpj: cleanedCnpj,
        email,
        address,
        phone,
        asaasCustomerId: asaasCustomer.id,
      }
    })
  }
}

