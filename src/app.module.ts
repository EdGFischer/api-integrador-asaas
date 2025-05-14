import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controller/authenticate/authenticate.controller';
import { CreateClientController } from './controller/client/create-client.controller';
import { FetchUserClientController } from './controller/client/fetch-client.controller';
import { DeleteClientController } from './controller/client/delete-client.controller';
import { UpdateClientController } from './controller/client/update-client.controller';
import { AsaasService } from './services/asaas/asaas.service';
import { HttpModule } from '@nestjs/axios';
import { DashboardClientController } from './controller/client/dashboard.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    AuthModule
  ],
  controllers: [
    AuthenticateController,
    CreateClientController,
    FetchUserClientController,
    UpdateClientController,
    DeleteClientController,
    DashboardClientController,
  ],
  providers: [PrismaService, AsaasService],
})
export class AppModule {}
