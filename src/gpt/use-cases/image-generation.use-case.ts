import OpenAI from "openai";
import * as fs from 'fs';
import * as path from 'path';
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";

interface Options {
    prompt:string;
    originalImagen?:string;
    maskImage?:string;
}

export const imageGenerationUseCase =async (openai :OpenAI,options:Options) => {

    const { prompt,originalImagen,maskImage } = options;

   //Todo: verificar original image

    if (!originalImagen || !maskImage) {

        const response = await openai.images.generate({
                prompt:prompt,
                model:'dall-e-3',
                n:1,
                size:'1024x1024',
                quality:'standard',
                response_format:'url'
        });

        const fileName = await downloadImageAsPng(response.data[0].url);
        const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

        //todo:guardar la imagen FS

        return {
            url:url,
            openAIUrl:response.data[0].url,
            revised_prompt:response.data[0].revised_prompt
        }
    }
    //originalImage = http://localhost:3000/gpt/image-generation/1706320113834.png
    //maskImage = Nase64;dfddefdffefwfkfmekfnfknwklfnwekfnkfnkfnkdnfkdnfknfdsnfkldf
    const pngImagePath = await downloadImageAsPng(originalImagen,true);
    const maskPath = await downloadBase64ImageAsPng(maskImage,true);

    const response =await openai.images.edit({
        model:'dall-e-2',
        prompt:prompt,
        image:fs.createReadStream(pngImagePath),
        mask:fs.createReadStream(maskPath),
        n:1,
        size:'1024x1024',
        response_format:'url'
    });
    const fileName = await downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

   

    return {
        url:url,
        openAIUrl:response.data[0].url,
        revised_prompt:response.data[0].revised_prompt
    }
}