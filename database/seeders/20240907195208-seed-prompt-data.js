'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('prompt_data', [
      {
        streamer_id: 1,
        prompt_name: "Preset 1 - Fantasy Characters",
        prompt_data: JSON.stringify([
          { "type": "random", "elementName": "gender", "sortIndex": 1, "value": ["male", "female"] },
          { "type": "random", "elementName": "ethnicities", "sortIndex": 6, "value": ["Caucasian","Middle-Eastern","African","East Asian","West Asian","Southeast Asian","Native American","Pacific Islander","Hispanic",
              "Afro-Caribbean","Mediterranean","Scandinavian","Eastern European","Western European","Caribbean"] },
          { "type": "random", "elementName": "ages", "sortIndex": 4, "value": ["adolescent", "teen", "young adult", "who is middle-aged", "in their early twenties", "in their late twenties",
              "thirty-something", "in their mid-thirties", "in their late thirties", "in their forties", "fifty-something",
              "sixty-something", "seventy-something"] },
          { "type": "random", "elementName": "attributes", "sortIndex": 2, "value": ["adventurous", "aloof", "ambitious", "analytical", "artistic",
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
              "witty", "zealous"] },
          { "type": "random", "elementName": "roles", "sortIndex": 3, "value": ["alchemist", "archer", "artificer", "assassin", "bard", "beastmaster", "blacksmith",
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
              "philosopher", "physicist", "mathematician", "chemist", "biologist"] },
          { "type": "random", "elementName": "fantasy_types", "sortIndex": 8, "value": ["high fantasy","epic fantasy","urban fantasy", "traditional fantasy","dark fantasy","sword and sorcery fantasy","historical fantasy","mythic fantasy",
              "fairy tale fantasy","steampunk fantasy","grimdark fantasy","science fantasy"] },
          { "type": "static", "sortIndex": 0, "value": "Create an awesome, epic and cool fantasy digital image of a" },
          { "type": "static", "sortIndex": 5, "value": "who looks to be of" },
          { "type": "static", "sortIndex": 7, "value": "heritage in a" },
          { "type": "random", "sortIndex": 9, "value": "setting." }
      ]),
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('prompt_data', { prompt_name: "Preset 1 - Fantasy" }, {});
  }
};
