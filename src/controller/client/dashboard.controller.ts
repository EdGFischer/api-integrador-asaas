import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { subMonths } from 'date-fns';

@Controller('/client-dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardClientController {
  constructor(
    private prisma: PrismaService
  ) {}

  @Get()
  async handle(
  ) {
    
    const fiveMonthsAgo = subMonths(new Date(), 5);

    const [clients] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where: {
          registrationDate: {
            gte: fiveMonthsAgo,
          },
        },
        orderBy: {
          registrationDate: 'desc',
        },
      }),
    ]);

    return {
      clients,
    };
  }
}