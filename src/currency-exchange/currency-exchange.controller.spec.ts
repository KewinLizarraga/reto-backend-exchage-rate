import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { InputCurrencyExchangeDto } from './dto/input-currency-exchange.dto';
import { CurrencyModule } from '../currency/currency.module';

describe('CurrencyExchangeController', () => {
  let currencyExchangeService: CurrencyExchangeService;
  let currencyExchangeController: CurrencyExchangeController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CurrencyModule],
      controllers: [CurrencyExchangeController],
      providers: [CurrencyExchangeService],
    }).compile();
  });

  beforeEach(async () => {
    currencyExchangeService = module.get<CurrencyExchangeService>(
      CurrencyExchangeService,
    );
    currencyExchangeController = module.get<CurrencyExchangeController>(
      CurrencyExchangeController,
    );
  });

  it('should be defined', () => {
    expect(currencyExchangeController).toBeDefined();
    expect(currencyExchangeService).toBeDefined();
  });

  describe('created currency', () => {
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
      const currencyExchange = await currencyExchangeController
        .currencyExchange(bodyCurrencyExchange)
        .catch((error) => error);

      expect(currencyExchange.message).toBe('USD currency not found');
    });

    it('currency exchange OK', async () => {
      jest
        .spyOn(currencyExchangeService, 'currencyExchange')
        .mockImplementation(() => Promise.resolve(responseCurrencyExchange));

      const newCurrencies = await currencyExchangeController.currencyExchange(
        responseCurrencyExchange,
      );

      expect(newCurrencies).toEqual(responseCurrencyExchange);
    });
  });
});
