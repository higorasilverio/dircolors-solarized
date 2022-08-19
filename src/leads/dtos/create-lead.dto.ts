import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty({ message: 'Informe seu email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, { message: 'O email deve ter menos de 200 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Informe seu nome completo' })
  @MaxLength(200, { message: 'O nome deve ter menos de 200 caracteres' })
  fullName: string;

  @IsNotEmpty({ message: 'Informe sua cidade' })
  @MaxLength(200, { message: 'A cidade deve ter menos de 200 caracteres' })
  city: string;

  @IsNotEmpty({ message: 'Informe seu estado' })
  @MaxLength(20, { message: 'O estado deve ter menos de 20 caracteres' })
  state: string;

  @IsBoolean({ message: 'O campo optIn dever ser boleano' })
  @Equals(true, { message: 'O optIn deve ser aceito para criar o lead' })
  optIn: boolean;
}
