import { IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @Length(5, 1000)
  @IsString()
  content: string;
}
