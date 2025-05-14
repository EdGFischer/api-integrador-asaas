import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Env } from 'src/env';

@Injectable()
export class AsaasService {
  private readonly baseUrl = 'https://api-sandbox.asaas.com/v3/customers';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService<Env, true>,
  ) {
    this.apiKey = config.get('ASAAS_API_KEY', { infer: true });
  }

  async createCustomer(data: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    address: string;
  }): Promise<{ id: string }> {
    
    const response = await firstValueFrom(
      this.httpService.post(
        this.baseUrl,
        {
          name: data.name,
          email: data.email,
          cnpj: data.cpfCnpj,
          phone: data.phone,
          address: data.address,
        },
        {
          headers: {
            accept: 'application/json', 
            'content-type': 'application/json',
            access_token: `${this.apiKey}`,
          },
        },
      ),
    );

    return response.data;
  }


  async updateCustomer(id: string, data: {
    name?: string;
    email?: string;
    cpfCnpj?: string;
    phone?: string;
    address?: string;
  }): Promise<{ id: string }> {

    const response = await firstValueFrom(
      this.httpService.put(
        `${this.baseUrl}/${id}`,
        {
          name: data.name,
          email: data.email,
          cpfCnpj: data.cpfCnpj,
          phone: data.phone,
          address: data.address,
        },
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            access_token: `${this.apiKey}`,
          },
        },
      ),
    );

    return response.data;
  }

async deleteCustomer(asaasCustomerId: string): Promise<void> {
  await firstValueFrom(
    this.httpService.delete(`${this.baseUrl}/${asaasCustomerId}`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        access_token: this.apiKey,
      },
    }),
  );
}
}
