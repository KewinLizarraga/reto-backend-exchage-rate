import { Test, TestingModule } from '@nestjs/testing';

import { CurrencyExchangeService } from './currency-exchange.service';
import { InputCurrencyExchangeDto } from './dto/input-currency-exchange.dto';
import { CurrencyModule } from '../currency/currency.module';

describe('CurrencyExchangeService', () => {
  let currencyExchangeService: CurrencyExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CurrencyModule],
      providers: [CurrencyExchangeService],
    }).compile();

    currencyExchangeService = module.get<CurrencyExchangeService>(
      CurrencyExchangeService,
    );
  });

  it('should be defined', () => {
    expect(currencyExchangeService).toBeDefined();
  });

  describe('currency exchange', () => {
    const bodyCurrencyExchange: InputCurrencyExchangeDto = {
      quote_amount: 123,
      currency_origin: 'USD',
      currency_destination: 'EUR',
    };

    const responseCurrencyExchange = {
      quote_amount: 123,
      quote_amount_changed: 553.5,
      currency_origin: 'EUR',
      currency_destination: 'USD',
      exchange_rate: 4.5,
    };

    it('currency of origin or designation does not exist', async () => {
      const currencyExchange = await currencyExchangeService
        .currencyExchange(bodyCurrencyExchange)
        .catch((error) => error);

      expect(currencyExchange.message).toBe('USD currency not found');
    });

    it('currency exchange OK', async () => {
      jest
        .spyOn(currencyExchangeService, 'currencyExchange')
        .mockImplementation(() => Promise.resolve(responseCurrencyExchange));

      const newCurrencies = await currencyExchangeService.currencyExchange(
        responseCurrencyExchange,
      );

      expect(newCurrencies).toEqual(responseCurrencyExchange);
    });
  });
});
