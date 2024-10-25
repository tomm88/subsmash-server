const { uploadToS3 } = require('../../config/awsConfig');

const uploadCharacterImagetoS3 = async (twitchUsername, imageName, file) => {

    const params = {
        Bucket: 'subsmash',
        Key: `userData/${twitchUsername}/images/characters/${imageName}`,
        Body: file,
        ContentType: 'image/png'

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

module.exports = uploadCharacterImagetoS3;