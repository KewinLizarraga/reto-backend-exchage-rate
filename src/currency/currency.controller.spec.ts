import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CreateCurrencyDto, CurrencyDto } from './dto/create-currency.dto';

describe('CurrencyController', () => {
  let currencyService: CurrencyService;
  let currencyController: CurrencyController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CurrencyController],
      providers: [CurrencyService],
    }).compile();
  });

  beforeEach(async () => {
    currencyService = module.get<CurrencyService>(CurrencyService);
    currencyController = module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(currencyController).toBeDefined();
    expect(currencyService).toBeDefined();
  });

  describe('created currency', () => {
    const bodyCurrencies: CurrencyDto = {
      destination: 'USD',
      exchange_rate: 4.5,
    };
    const body: CreateCurrencyDto = {
      currency_origin: 'EUR',
      currencies: bodyCurrencies,
    };

    it('should return quote rate', async () => {
      expect(await currencyController.create(body)).toEqual({
        EUR: { destination: 'USD', exchange_rate: 4.5 },
      });
    });
  });

  describe('get currency', () => {
    it('currency not found', async () => {
      const currencies = await currencyController
        .findOne('USD')
        .catch((error) => error);

      expect(currencies.message).toBe('USD currency not found');
    });
    it('getting the currency', async () => {
      jest
        .spyOn(currencyService, 'findOne')
        .mockImplementation(() => Promise.resolve({ USD: 4.5 }));
      const currencies = await currencyController.findOne('USD');
      expect(currencies).toEqual({ USD: 4.5 });
    });
  });
});
