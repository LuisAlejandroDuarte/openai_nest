import * as path from "path";
import * as fs from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';

import OpenAI from 'openai';

import { ortographyCheckUseCase,prosConsDicusserStreamUseCase,prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudiooDto, TranslateDto } from './dtos';



@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey:process.env.OPENAI_APIKEY,
  })

    //Solo va llamar casos de usos

  async  orthographyCheck(orthographyDto:OrthographyDto) {
      return await ortographyCheckUseCase( this.openai,{
        prompt:orthographyDto.prompt,
      });  
    }

    async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
      return await prosConsDicusserUseCase(this.openai, { prompt });
    }   

    async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
      return await prosConsDicusserStreamUseCase(this.openai, { prompt });
    }   

    async  translate(translateDto:TranslateDto) {
      return await translateUseCase( this.openai,{
        prompt:translateDto.prompt,lang: translateDto.lang
      });  
    }

    async  textToAudio({prompt,voice}:TextToAudiooDto) {
      return await textToAudioUseCase( this.openai,{
        prompt:prompt,voice: voice
      });  
    }

    async textToAudioGetter(fileId:string) {

      const filePath = path.resolve(__dirname,'../../generated/audios',`${fileId}.mp3`);

      const wasFound = fs.existsSync(filePath);

      if (!wasFound) new NotFoundException(`File ${fileId} no found`);

      return filePath;
  
    }
}
