import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { CurrencyModule } from './currency/currency.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CurrencyExchangeModule,
    CurrencyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
