import { Module } from '@nestjs/common';

import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CurrencyModule } from '@/currency/currency.module';

@Module({
  imports: [CurrencyModule],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
