const { uploadToS3 } = require('../../config/awsConfig');

const uploadFontToS3 = async (twitchUsername, file) => {

    const params = {
        Bucket: 'subsmash',
        Key: `userData/${twitchUsername}/fonts/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        await uploadToS3(params)
        const s3Url = `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${params.Key}`
        return s3Url;
    } catch (error) {
        console.error('Error uploading the file', error);
        throw error
    }
}

module.exports = uploadFontToS3;