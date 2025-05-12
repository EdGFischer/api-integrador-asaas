import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create transfer (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  
    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService)
    

    prisma = moduleRef.get(PrismaService)

    await app.init();
  });

  it('[POST] /transfers', async () => {
    const user = await prisma.user.create({
      data:{
        name: 'João Silva',
        email: 'joao@teste.com',
        password: 'joao248',
      } 
    })

    const accessToken = jwt.sign({sub: user.id})

    const response = await request(app.getHttpServer())
      .post('/transfers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Initial Balance',
        amount: 3000.00 ,
        type: "INCOME",
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.transaction.findFirst({
      where: {
        description: 'Initial Balance',
      }
    })

    expect(userOnDatabase).toBeTruthy()

  });
});
