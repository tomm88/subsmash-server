const OpenAI = require('openai');
const openai = new OpenAI();
const enhancedPromptExamples = require('../../utils/enhancedPromptExamples');

const enhancePrompt = async(userPrompt) => {
    //Calls gpt-4o-mini to generate a name for the character, given the description of the character, extracted from the full prompt
    const prompt = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": `You are a helpful prompt-writer. Your task is to enhance the simple prompt provided to ensure that, when submitted to dall-e-3, it will create a visually stunning and intricate picture. You should take the attributes given in the prompt, and from them extrapolate what clothing and props the subject of the image is likely to have, as well as what environment they are likely to be in, and describe them in detail. Here is a JSON object with examples of simple prompts that have been well enhanced to rich prompts that create the desired result ${enhancedPromptExamples}. You will need to be creative and imaginative to expand upon potentially limited information to ensure a fully fleshed out prompt is returned every time. The prompt you return will be submitted to Dall-e-3, so please keep its content safety system in mind. If you detect anything in the prompt provided that, when passed to dall-e may trigger a safety warning, please use your discretion to omit those details, or re-work them so that your enhanced prompt is as close to what the user wants as possible, while remaining within dall-e's content guidelines. You should return the enhanced prompt and nothing else. The maximum length of your returned prompt should be 1000 characters, including spaces.` },
            { "role": "user", "content": `${userPrompt}` }
        ],
        model: "gpt-4o",
    })

    return prompt.choices[0].message.content;
}

module.exports = enhancePrompt;