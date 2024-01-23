import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';

import { ortographyCheckUseCase,prosConsDicusserStreamUseCase,prosConsDicusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';



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
}
