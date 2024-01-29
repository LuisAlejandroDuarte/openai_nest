import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ImageGenerationDTO, ImageVariationDTO, OrthographyDto, ProsConsDiscusserDto, TextToAudiooDto, TranslateDto } from './dtos';
import { type Response } from 'express';


@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check') 
  orthographyCheck(
    @Body() orthographyDto:OrthographyDto
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')

    prosConsDiscusser(@Body()  prosconsdiscusser:ProsConsDiscusserDto)
    {
        return this.gptService.prosConsDicusser(prosconsdiscusser);
    }

    @Post('pros-cons-discusser-stream')
     async prosConsDiscusserStream(
      @Body()  prosconsdiscusser:ProsConsDiscusserDto,
      @Res() res:Response)
    {
        const stream =await  this.gptService.prosConsDicusserStream(prosconsdiscusser);

        res.setHeader('Content-Type','application/json');
        res.status(HttpStatus.OK);

        for await(const chunk of stream) {
          const piece = chunk.choices[0].delta.content || '';
          console.log(piece);
          res.write(piece);
        }
        res.end();
    }
    
    @Post('translate') 
    translateText(
      @Body() translateDto:TranslateDto
    ) {
      return this.gptService.translate(translateDto);
    }

    @Post('text-to-audio') 
    async textToAudio(
      @Body() textToAudioDto:TextToAudiooDto,
      @Res() res:Response
    ) {
      const filePath =await this.gptService.textToAudio(textToAudioDto);

      res.setHeader('Content-Type','audio/mp3');
      res.status(HttpStatus.OK);
      res.sendFile(filePath);
    }

    @Get('text-to-audio/:fileId') 
    async textToAudioGetter(      
      @Res() res:Response,
      @Param('fileId') fileId:string
    ) {
       const filePath =await this.gptService.textToAudioGetter(fileId);

       res.setHeader('Content-Type','audio/mp3');
       res.status(HttpStatus.OK);
       res.sendFile(filePath);
    }

    @Post('image-generation')
    async imageGeneration(
      @Body() imageGenerationDto: ImageGenerationDTO)
      {
        console.log({imageGenerationDto});
        return await this.gptService.imageGeneration(imageGenerationDto);
      }
 
  @Get('image-generation/:fileId')
  async imageGenerationGetter(
    @Res() res:Response,
    @Param('fileId') fileId:string)
    {
      const filePath =await this.gptService.textToImageGetter(fileId);
      res.status(HttpStatus.OK);
      res.sendFile(filePath);
    }      

  @Post('image-variation')
  async imageVariation(
    @Body() imageVariationDTO: ImageVariationDTO)
    {
      console.log({imageVariationDTO});
      return await this.gptService.generateImageVariation(imageVariationDTO);
    }        
}
