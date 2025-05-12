import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Env } from 'src/env';

@Injectable()
export class AsaasService {
  private readonly baseUrl = 'https://www.asaas.com/api/v3/customers';
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
          cpfCnpj: data.cpfCnpj,
          phone: data.phone,
          address: data.address,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      ),
    );

    return response.data;
  }
}
