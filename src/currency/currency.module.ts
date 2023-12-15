import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
