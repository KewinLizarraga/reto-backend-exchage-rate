import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Length,
} from 'class-validator';

export class CurrencyDto {
  @ApiProperty({
    description: '',
    nullable: false,
    example: 'EUR',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  destination: string;

  @ApiProperty({
    description: '',
    nullable: false,
    example: 4.5,
  })
  @IsNotEmpty()
  @IsNumber()
  exchange_rate: number;
}
export class CreateCurrencyDto {
  @ApiProperty({
    description: '',
    nullable: false,
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  currency_origin: string;

  @ApiProperty({
    description: '',
    nullable: false,
    example: '{"destination": "EUR", "exchange_rate": 4.5}',
  })
  @IsNotEmpty()
  @IsObject()
  currencies: CurrencyDto;
}
