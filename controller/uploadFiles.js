const AWS = require('aws-sdk');
const keys = require('../config/config');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'eu-central-1' });

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

exports.upload = async (req, res) => {
  try {
    const key = `${req.user.id}/${uuidv4()}.jpeg`;
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'dictionary-1',
        ContentType: 'image/jpeg',
        Key: key,
      },
      (err, url) => res.send({ key, url }),
    );
  } catch (error) {
    console.log(error);
  }
};
