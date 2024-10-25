const preset1FantasyCharacters = {
    genders: ["male", "female"],
    ethnicities: ["Caucasian","Middle-Eastern","African","East Asian","West Asian","Southeast Asian","Native American","Pacific Islander","Hispanic",
        "Afro-Caribbean","Mediterranean","Scandinavian","Eastern European","Western European","Caribbean"],
    ages: ["adolescent", "teen", "young adult", "who is middle-aged", "in their early twenties", "in their late twenties",
        "thirty-something", "in their mid-thirties", "in their late thirties", "in their forties", "fifty-something",
        "sixty-something", "seventy-something"],
    attributes: ["adventurous", "aloof", "ambitious", "analytical", "artistic",
        "assertive", "bold", "calculating", "capricious", "cautious",
        "charitable", "charming", "clever", "compassionate", "confident",
        "conscientious", "courageous", "curious", "cynical", "dauntless", "dedicated",
        "deliberate", "dependable", "diplomatic", "disciplined",
        "discreet", "earnest", "eccentric", "eloquent", "elusive",
        "enigmatic", "enthusiastic", "erudite", "ethereal", "evasive",
        "exuberant", "faithful", "fervent", "fiery",
        "focused", "forthright", "freethinking", "gallant", "gentle",
        "genuine", "gregarious", "guarded", "harmonious", "heroic", "humble",
        "idealistic", "imaginative", "impartial", "impassioned", "impetuous", "industrious",
        "ingenious", "insightful", "inspirational", "intrepid", "intuitive",
        "inventive", "jovial", "judicious", "keen", "loyal", "magnanimous",
        "meditative", "melancholic", "meticulous", "mystical", "naive", "nefarious",
        "noble", "nonchalant", "observant", "optimistic", "oracular", "organized",
        "passionate", "patient", "pensive", "perceptive", "persistent", "persuasive",
        "philanthropic", "philosophical", "pioneering", "placid", "poetic", "pragmatic",
        "precocious", "principled", "prodigal", "profound", "prudent", "pugnacious",
        "radiant", "rational", "realistic", "reflective", "relentless",
        "reticent", "reverent", "rogue", "romantic", "sage", "sanguine",
        "sarcastic", "scholarly", "scrupulous", "serene", "shrewd", "sincere",
        "skeptical", "skillful", "sly", "sober", "solitary", "sophisticated",
        "spontaneous", "stoic", "strategic", "subtle", "sullen",
        "superstitious", "supportive", "surly", "tactful", "tenacious",
        "thoughtful", "tranquil", "unassuming", "unbridled", "unconventional",
        "undaunted", "unflappable", "unorthodox", "unyielding", "uplifting", "urbane",
        "venturesome", "vigilant", "vivacious", "wary", "whimsical", "wistful",
        "witty", "zealous"],
    roles: ["alchemist", "archer", "artificer", "assassin", "bard", "beastmaster", "blacksmith",
        "bounty hunter", "cleric", "conjurer", "druid", "duelist", "enchanter/enchantress",
        "engineer", "explorer", "farmer", "gladiator", "guardian", "herbalist", "hunter",
        "illusionist", "jeweler", "knight", "librarian", "mercenary", "merchant", "monk",
        "necromancer", "nomad", "oracle", "paladin", "pirate", "priest/priestess", "ranger",
        "rogue", "scholar", "scout", "seer", "shaman", "siren", "sorcerer/sorceress", "spy",
        "summoner", "templar", "thief", "trader", "warlock", "witch", "wizard", "woodsman",
        "scribe", "diplomat", "tailor", "cartographer", "fisher", "miner", "sailor", "smith",
        "brewer", "chef/cook", "innkeeper", "servant", "noble", "courtier", "ambassador",
        "historian", "astrologer", "diviner", "bard", "dancer", "singer", "sculptor", "painter",
        "guard", "cavalier", "bandit", "craftsman", "apprentice",
        "master", "advisor", "prophet", "mystic", "herbalist", "potioneer", "alchemist",
        "falconer", "beast tamer", "botanist", "florist", "geologist",
        "philosopher", "physicist", "mathematician", "chemist", "biologist"],
    fantasy_types: ["high fantasy","epic fantasy","urban fantasy", "traditional fantasy","dark fantasy","sword and sorcery fantasy","historical fantasy","mythic fantasy",
        "fairy tale fantasy","steampunk fantasy","grimdark fantasy","science fantasy"],
    static1: "Create an awesome, epic and cool fantasy digital image of a ",
    static2: " who looks to be of ",
    static3: " heritage in a ",
    static4: " setting.",
    orderByIndex: [6, 0, 3, 4, 2, 7, 1, 8, 5, 9],
    promptName: "Preset 1 - Fantasy Characters"
}


const { PutObjectCommand } = require('@aws-sdk/client-s3')
const s3 = require('../config/awsConfig');
const fs = require('fs');


const uploadImagetoS3 = async (file, imageName) => {
        
    const params = {
        Bucket: 'subsmash',
        Key: `images/${twitchUsername}/characters/${imageName}`,
        Body: file,
        ContentType: 'image/png' //detect MIME type

    };

    const command = new PutObjectCommand(params);

    try {
        const data = await s3.send(command);
        console.log('File uploaded successfully', data);
        return data;
    } catch (error) {
        console.error('Error uploading the file', error);
        throw error
    }
}