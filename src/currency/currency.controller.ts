import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return await this.currencyService.create(createCurrencyDto);
  }

  @Get(':currency_origin')
  async findOne(@Param('currency_origin') currency_origin: string) {
    return await this.currencyService.findOne(currency_origin);
  }
}
