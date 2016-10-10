import multer from 'multer';
import config from '/imports/config.js';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const { S3_BUCKET, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } = config.AWS;
aws.config.update({accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: REGION});

var toS3 = multer({
  storage: multerS3({
    s3: new aws.S3(),
    bucket: S3_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`)
    }
  })
})

var inMemory = multer({
  inMemory: true,
  fileSize: 5 * 1024 * 1024, // no larger than 5mb
  rename: function (fieldname, filename) {
    // generate a unique filename
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  }
});

export { inMemory, toS3 };
