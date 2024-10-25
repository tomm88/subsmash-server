const db = require('../models');

//Adds newly created character to the database
const createCharacterRecord = async (characterName, userPrompt, imageUrl, fileName) => {
    try {
        const [newChar, newCharCreated] = await db.Character.findOrCreate({
            where: {
                image_url: imageUrl
            },
            defaults: {
                character_name: characterName,
                user_prompt: userPrompt,
                file_name: fileName
            }
        });
        
        return {
            characterName: newChar.dataValues.character_name,
            userPrompt: newChar.dataValues.user_prompt,
            imageUrl: newChar.dataValues.image_url,
            id: newChar.dataValues.id
        }
    } catch (error) {
        console.error('Error creating character record in database', error)
    }


}

module.exports = createCharacterRecord;