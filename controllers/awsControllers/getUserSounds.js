const { ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { s3 } = require('../../config/awsConfig');

const getUserSounds = async (twitchUsername) => {
    const sounds = {
        userSounds: [],
        presetSounds: []
    }
    const params = {
        Bucket: 'subsmash',
        Prefix: `userData/${twitchUsername}/sounds/`
    };

    const presetParams = {
        Bucket: 'subsmash',
        Prefix: 'userData/presets/sounds/'
    }

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);
        if (data.Contents) {
            const soundList = data.Contents.map(item => ({
                title: item.Key.split('/').pop(),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}`
            }));
            sounds.userSounds = soundList;
        }

        const presetsCommand = new ListObjectsV2Command(presetParams);
        const presetData = await s3.send(presetsCommand);
        if (presetData.Contents) {
            const soundList = presetData.Contents.map(item => ({
                title: item.Key.split('/').pop().split('.').slice(0, -1).join('.'),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}`
            }));
            sounds.presetSounds = soundList;
        }
        return sounds
    } catch (error) {
        console.error("Error fetching sounds from S3", error);
        return "Error fetching sounds from S3"
    }
}

module.exports = getUserSounds;