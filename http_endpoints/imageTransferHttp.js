const db = require('../database/models');
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { uploadToS3 } = require('../config/awsConfig');
const fs = require('fs');

const imageTransferHttp = async (req, res) => {

    const { twitchUsername } = req.session;

    const allImages = await db.Character.findAll({
        attributes: ['file_name']
    });

    const newArray = allImages.map(e => e.file_name)

    const uploadImagetoS3 = async (file, imageName) => {
        
        const params = {
            Bucket: 'subsmash',
            Key: `userData/${twitchUsername}/images/characters/${imageName}`,
            Body: file,
            ContentType: 'image/png'

        };

        try {
            const data = await uploadToS3(params);
            console.log('File uploaded successfully', data);
            return data;
        } catch (error) {
            console.error('Error uploading the file', error);
            throw error
        }
    }

    for (const img of newArray) {
        try {
            const file = fs.readFileSync(`./images/${img}`);
            await uploadImagetoS3(file, img);
            await db.Character.update(
                {
                image_url: `https://subsmash.s3.eu-west-2.amazonaws.com/userData/${twitchUsername}/images/characters/${img}`
                },
                { where: {
                    file_name: img
                }
                },
            );
        } catch (error) {
            console.error("upload failed", error)
        }
    }

    res.status(200).json({message: 'all files uploaded'});

}

module.exports = imageTransferHttp;