import { IsArray, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsArray()
  categories: string[];
  @IsArray()
  color: string;
  @IsString()
  desc: string;
  @IsString()
  img: string;
  @IsNumber()
  price: number;
  @IsArray()
  size: string;
  @IsString()
  title: string;
}
