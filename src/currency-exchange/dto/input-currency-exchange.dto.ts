import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class InputCurrencyExchangeDto {
  @ApiProperty({
    description: 'amount of money to be exchanged into another currency',
    nullable: false,
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  'quote_amount': number;

  @ApiProperty({
    description: 'origin of the currency',
    nullable: false,
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  'currency_origin': string;

  @ApiProperty({
    description: 'destination of the currency to be exchanged to',
    nullable: false,
    example: 'EUR',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  'currency_destination': string;
}
