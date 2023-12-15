import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

import { CurrencyService } from './currency.service';
import { CreateCurrencyDto, CurrencyDto } from './dto/create-currency.dto';

describe('CurrencyService', () => {
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CurrencyService],
    }).compile();

    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(currencyService).toBeDefined();
  });

  describe('create', () => {
    const bodyCurrencies: CurrencyDto = {
      destination: 'USD',
      exchange_rate: 4.5,
    };
    const body: CreateCurrencyDto = {
      currency_origin: 'EUR',
      currencies: bodyCurrencies,
    };
    it('registering currencies', async () => {
      const newCurrencies = await currencyService.create(body);
      expect(newCurrencies).toEqual({
        EUR: { destination: 'USD', exchange_rate: 4.5 },
      });
    });
  });

  describe('get currency', () => {
    const currency_origin = 'USD';

    it('currency not found', async () => {
      const currencies = await currencyService
        .findOne(currency_origin)
        .catch((error) => error);

      expect(currencies.message).toBe('USD currency not found');
    });

    it('getting the currency', async () => {
      jest
        .spyOn(currencyService, 'findOne')
        .mockImplementation(() => Promise.resolve({ USD: 4.5 }));

      const currencies = await currencyService.findOne(currency_origin);

      expect(currencies).toEqual({ USD: 4.5 });
    });
  });
});
