import OpenAI from "openai";

interface Options {
    prompt: string;
    lang:string;

}


export const translateUseCase =async (openai:OpenAI, options:Options) => {
    
    const { prompt,lang }= options


    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `Traduce el siguiente texto al idioma ${lang }:${prompt}`
        },        
      ],
          model: "gpt-4",
          temperature:0.3,
         // max_tokens:150,        
        }
      );

      //  model: "gpt-3.5-turbo-1106",
      //     temperature:0.3,
      //     max_tokens:150,
      //     response_format:{
      //       type:'json_object'
      //     }
          



    
    const resPonse = completion.choices[0].message.content;     
    return {message:  resPonse};

    //  return {
    //    prompt: prompt,
    //    apikey:process.env.OPENAI_APIKEY,
    //  }   

}