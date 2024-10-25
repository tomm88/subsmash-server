const uploadUserImagetoS3 = require('../controllers/awsControllers/uploadUserImageToS3');

const uploadUserImagestoS3Http = async (req, res) => {
    const { files } = req;
    const { twitchUsername } = req.session;

    if (!files || files.length === 0) {
        return res.status(400).send('No files uploaded');
    }

    try {
        const uploadResponses = [];
        
        for (const file of files) {
            const s3Response = await uploadUserImagetoS3(twitchUsername, file);
            uploadResponses.push(s3Response);
        }
        res.status(200).send({ success: true, message: 'Files uploaded successfully', data: uploadResponses });
    } catch (error) {
        console.error('Error uploading file to S3', error);
        res.status(500).send({ error: 'Failed to upload file' });
    }
}

module.exports = uploadUserImagestoS3Http;