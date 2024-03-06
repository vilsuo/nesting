import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @Length(2, 200)
  @IsString()
  content: string;
}
