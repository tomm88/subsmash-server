const { ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { s3 } = require('../../config/awsConfig');

const getUserImages = async (twitchUsername) => {
    const images = {
        userImages: [],
        presetImages: []
    };
    const params = {
        Bucket: 'subsmash',
        Prefix: `userData/${twitchUsername}/images/uploads/`
    };

    const presetsParams = {
        Bucket: 'subsmash',
        Prefix: 'userData/presets/images/uploads/'
    }

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);
        if (data.Contents) {
            const imageList = data.Contents.map(item => ({
                title: item.Key.split('/').pop(),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}?${new Date().getTime()}`
            }));
            images.userImages = imageList;
        }

        const presetsCommand = new ListObjectsV2Command(presetsParams);
        const presetsData = await s3.send(presetsCommand);
        if (presetsData.Contents) {
            const imageList = presetsData.Contents.map(item => ({
                title: item.Key.split('/').pop(),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}`
            }));
            images.presetImages = imageList;
        }
        return images;
    } catch (error) {
        console.error("Error fetching images from S3", error);
        return "Error fetching images from S3"
    }
}

module.exports = getUserImages;