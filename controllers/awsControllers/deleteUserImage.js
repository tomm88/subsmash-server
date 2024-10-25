const { s3 }= require('../../config/awsConfig');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

const deleteUserImage = async (twitchUsername, imageTitle) => {
    const params = {
        Bucket: 'subsmash',
        Key: `userData/${twitchUsername}/images/uploads/${imageTitle}` 
    };

    const command = new DeleteObjectCommand(params);

    try {
        const data = await s3.send(command);
        console.log('Image deleted successfully', data);
        return data;
    } catch (error) {
        console.error('Error deleting the file', error);
        throw error;
    }
};

module.exports = deleteUserImage;