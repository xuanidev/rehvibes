import { SurveyData } from "../models";
import OpenAI from "openai";
const openai = new OpenAI();

const fetchOpenAI = async (valuePrompt:string, fileId:string) => {

    const prompt = `${valuePrompt}\n\nUse the following file ID in the prompt: ${fileId}`;

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Use the model you prefer
            prompt: prompt,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data;
};

const generatePromp = async (data: SurveyData):Promise<string> =>{
    const prompt = '';
    const result = await fetchOpenAI(prompt, 'exercises.json');
    console.log(result);
    return ''
}

export const callGPT = async (data: SurveyData):Promise<string> => {
    generatePromp(data);
    return '';
}