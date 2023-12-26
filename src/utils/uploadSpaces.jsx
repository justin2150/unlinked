import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export function uploadSpaces(name, data) {
  // Step 1: Import the S3Client object and all necessary SDK commands.
  // Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
  const s3Client = new S3Client({
    endpoint: 'https://sfo3.digitaloceanspaces.com',
    forcePathStyle: false,
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'DO00X6BL3C3LQFHNU2AQ',
      secretAccessKey: 'Mn/Og4oPfbClTSpq8Z1LyTLWgc0s7WR/OG4MlXaz4FI', // Secret access key defined through an environment variable.
    },
  });

  // Step 3: Define the parameters for the object you want to upload.
  const params = {
    Bucket: 'irs-bucket',
    Key: `${name}`,
    Body: `${data}`,
    ACL: 'private',
    ContentType: 'image/jpeg',
    Metadata: {
      // Defines metadata tags.
      'x-amz-meta-my-key': 'your-value',
    },
  };

  // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
  const uploadObject = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log(
        `Successfully uploaded object: ${params.Bucket}/${params.Key}`
      );
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };
  // Step 5: Call the uploadObject function.
  uploadObject();
}
