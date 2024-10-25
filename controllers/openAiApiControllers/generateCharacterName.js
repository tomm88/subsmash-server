const OpenAI = require('openai');
const openai = new OpenAI();

const generateName = async(userPrompt) => {
    //Calls gpt-4o-mini to generate a name for the character, given the description of the character, extracted from the full prompt
    const name = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": "You are a helpful assistant. Your task is to come up with fun and interesting names for characters or creatures. You will receive a prompt that was initially given to an image generator, so it might contain instructions pertaining to images like art style - you can ignore these. You're only interested in character traits, descriptions, settings etc. Please return the name and nothing else. If the prompt requested a creature, please create a name for the species, rather than naming the individual." },
            { "role": "user", "content": `come up with a name for the character described in this image prompt: ${userPrompt}` }
        ],
        model: "gpt-4o",
    })

    return name.choices[0].message.content
}

module.exports = generateName;