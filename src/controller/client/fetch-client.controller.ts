import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/client')
@UseGuards(JwtAuthGuard)
export class FetchUserClientController {
  constructor(
    private prisma: PrismaService
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const perPage = 10;
    const [clients, totalCount] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        take: perPage,
        skip:(page - 1) * perPage,
        orderBy: {
          registrationDate: 'desc',
        },
      }),
      this.prisma.client.count(),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      clients,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
    };
  }
}