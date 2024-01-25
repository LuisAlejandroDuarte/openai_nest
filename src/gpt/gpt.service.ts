import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { ortographyCheckUseCase,prosConsDicusserStreamUseCase,prosConsDicusserUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TranslateDto } from './dtos';



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
}
