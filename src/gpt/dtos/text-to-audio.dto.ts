import { IsOptional, IsString } from "class-validator";

export class TextToAudiooDto {

    @IsString()
    readonly prompt: string;
    @IsString()
    @IsOptional()
    readonly voice?: string;
    
  }