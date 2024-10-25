const generateSampleImage = require('../../controllers/openAiApiControllers/generateSampleImage');

const generateSampleImageHttp = async (req, res) => {
    try {
        const { prompt } = req.body;

        const sampleImage = await generateSampleImage(prompt);

        res.status(200).json({success: true, message: "Successfully generated sample image", image: sampleImage});
    } catch (error) {
        res.status(500).json({success: false, message: "Error generating sample image"})
    }
}

module.exports = generateSampleImageHttp;