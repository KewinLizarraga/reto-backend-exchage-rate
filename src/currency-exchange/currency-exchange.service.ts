import { Injectable, NotFoundException } from '@nestjs/common';

import { InputCurrencyExchangeDto } from './dto/input-currency-exchange.dto';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class CurrencyExchangeService {
  constructor(private readonly currencyService: CurrencyService) {}

  async currencyExchange(inputCurrencyExchangeDto: InputCurrencyExchangeDto) {
    const { quote_amount, currency_origin, currency_destination } =
      inputCurrencyExchangeDto;

    const exchangeRate = await this.getExchangeRate(
      currency_origin,
      currency_destination,
    );

    const quoteAmountChanged = parseFloat(
      (quote_amount * exchangeRate).toFixed(2),
    );

    return {
      quote_amount,
      quote_amount_changed: quoteAmountChanged,
      currency_origin,
      currency_destination,
      exchange_rate: exchangeRate,
    };
  }

  private async getExchangeRate(
    currencyOrigin: string,
    currencyDestination: string,
  ): Promise<number> {
    const getCurrency = await this.currencyService.findOne(currencyOrigin);
    const exchangeRate = getCurrency[currencyDestination];
    if (!exchangeRate) {
      throw new NotFoundException(`${currencyDestination} currency not found`);
    }
    return exchangeRate;
  }
}
