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

  it('[GET] /transfers', async () => {
    const user = await prisma.user.create({
      data:{
        name: 'João Silva',
        email: 'joao@teste.com',
        password: 'joao248',
      } 
    })

    const accessToken = jwt.sign({sub: user.id})

    await prisma.transaction.createMany({
      data: [
        {
          description: 'Initial Balance',
          amount: 3000.00 ,
          type: "INCOME",
          toUserId: user.id
        },
        {
          description: 'Deposit',
          amount: 500.00 ,
          type: "INCOME",
          toUserId: user.id
        },
      ]
    })

    const response = await request(app.getHttpServer())
      .get('/transfers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      transfers: [
        expect.objectContaining({description: 'Initial Balance'}),
        expect.objectContaining({description: 'Deposit'})
      ]
    })

  });
});
