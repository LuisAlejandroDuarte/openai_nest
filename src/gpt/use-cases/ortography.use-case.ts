import OpenAI from "openai";

interface Options {
    prompt: string;

}


export const ortographyCheckUseCase =async (openai:OpenAI, options:Options) => {
    
    const { prompt }= options


    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales
           las palabras usadas deben exitir en el diccionario de la Real Academia española, debes responder en formato
           JSON, tu tarea es corregirlos y retornar información de soluciones,
           tambien debes de dar un porcentaje de acierto al usuario,
           si no hay errores, debes de  retornar un mensaje de felicitaciones.
           
           Ejemplo de salida : 
           {
            userScore: number,
            errors:string[], // ['error->solución']
            message :string, // Usa emojis y texto para felicitar el usuario
           }
           
           `
        },
        {
          role:'user',
          content:prompt
        }
      
      ],
          model: "gpt-3.5-turbo-1106",
          temperature:0.3,
          max_tokens:150,
          response_format:{
            type:'json_object'
          }
        }
      );

      //  model: "gpt-3.5-turbo-1106",
      //     temperature:0.3,
      //     max_tokens:150,
      //     response_format:{
      //       type:'json_object'
      //     }
          


    //console.log(completion);
    
    const resPonse = JSON.parse(completion.choices[0].message.content);
    
    return resPonse;

    //  return {
    //    prompt: prompt,
    //    apikey:process.env.OPENAI_APIKEY,
    //  }   

}