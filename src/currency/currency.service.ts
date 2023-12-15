import { Cache } from 'cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const { currency_origin, currencies } = createCurrencyDto;

    const existsCurrency: string = await this.cacheManager.get(currency_origin);

    if (!existsCurrency) {
      await this.cacheManager.set(
        currency_origin,
        JSON.stringify(currencies),
        0,
      );
      return { [currency_origin]: currencies };
    } else {
      const updatedCurrencies = {
        ...JSON.parse(existsCurrency),
        ...JSON.parse(JSON.stringify(currencies)),
      };
      await this.cacheManager.set(currency_origin, updatedCurrencies);
      return { [currency_origin]: updatedCurrencies };
    }
  }

  async findOne(currency_origin: string) {
    const currencies: string = await this.cacheManager.get(currency_origin);
    if (!currencies) {
      throw new NotFoundException(`${currency_origin} currency not found`);
    }
    return JSON.parse(currencies);
  }
}
