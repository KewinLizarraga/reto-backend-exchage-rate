import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrencyExchangeService } from './currency-exchange.service';
import { InputCurrencyExchangeDto } from './dto/input-currency-exchange.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('Currency Exchange')
@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  currencyExchange(
    @Body() createCurrencyExchangeDto: InputCurrencyExchangeDto,
  ) {
    return this.currencyExchangeService.currencyExchange(
      createCurrencyExchangeDto,
    );
  }
}
