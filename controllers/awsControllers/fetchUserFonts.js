const { ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { s3 } = require('../../config/awsConfig');

const fetchUserFonts = async (twitchUsername) => {
    const fonts = {
        userFonts: [],
        presetFonts: []
    }
    const params = {
        Bucket: 'subsmash',
        Prefix: `userData/${twitchUsername}/fonts/`
    };

    const presetParams = {
        Bucket: 'subsmash',
        Prefix: 'userData/presets/fonts/'
    }

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);
        if (data.Contents) {
            const fontList = data.Contents.map(item => ({
                title: item.Key.split('/').pop().split('.').slice(0, -1).join('.'),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}`,
                isCustomFont: true
            }));
            fonts.userFonts = fontList;
        }

        const presetCommand = new ListObjectsV2Command(presetParams);
        const presetData = await s3.send(presetCommand);
        if (presetData.Contents) {
            const fontList = presetData.Contents.map(item => ({
                title: item.Key.split('/').pop().split('.').slice(0, -1).join('.'),
                url: `https://${params.Bucket}.s3.eu-west-2.amazonaws.com/${item.Key}`,
                isCustomFont: true
            }));
            fonts.presetFonts = fontList;
        }
        return fonts
    } catch (error) {
        console.error("Error fetching fonts from S3", error);
        return "Error fetching fonts from S3"
    }
}

module.exports = fetchUserFonts;