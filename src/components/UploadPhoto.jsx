import { useEffect, useRef, useState } from 'react';
import { SITE_URL } from '../utils/variables';
import { Spinner } from './Loader';
import styles from './UploadPhoto.module.css';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function uploadSpaces(name, data) {
  // Step 1: Import the S3Client object and all necessary SDK commands.

  // Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
  const s3Client = new S3Client({
    endpoint: 'https://sfo3.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: 'us-east-1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
    credentials: {
      accessKeyId: 'DO00X6BL3C3LQFHNU2AQ', // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: 'Mn/Og4oPfbClTSpq8Z1LyTLWgc0s7WR/OG4MlXaz4FI', // Secret access key defined through an environment variable.
    },
  });

  // Step 3: Define the parameters for the object you want to upload.
  const params = {
    Bucket: 'irs-bucket', // The path to the directory you want to upload the object to, starting with your Space name.
    Key: `${name}`, // Object key, referenced whenever you want to access this file later.
    Body: `${data}`, // The object's contents. This variable is an object, not a string.
    ACL: 'private', // Defines ACL permissions, such as private or public.
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
        'Successfully uploaded object: ' + params.Bucket + '/' + params.Key
      );
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };
  // Step 5: Call the uploadObject function.
  uploadObject();
}

export default function UploadPhoto({ illustration, children, label }) {
  const [url, setUrl] = useState(() => illustration);
  const [isUploading, setIsUploading] = useState(false);
  const image = useRef(null);

  useEffect(
    function () {
      if (!isUploading || url === illustration) return;

      const handler = () => setIsUploading(false);
      // WAS FORCED BY VSCODE TO CREATE A COPY OF THE REF
      const refCopy = image.current;

      image.current.addEventListener('load', handler);
      return () => refCopy.removeEventListener('load', handler);
    },
    [illustration, isUploading, url]
  );
  async function handleChange(e) {
    setIsUploading((v) => !v);
    uploadSpaces('dumm.jpg', e.target.files[0]);
    // let data = new FormData();
    // data.append('front-id', e.target.files[0]);
    // data = await fetch(`${SITE_URL}/api/v1/client/upload`, {
    //   method: 'POST',
    //   body: data,
    // });
    // const { path } = await data.json();
    // if (path) setUrl(`${SITE_URL}/${path}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img className={styles.image} src={url} ref={image} />
        {/* <embed
          src={`${SITE_URL}/uploads/1703257944005.pdf`}
          type="application/pdf"
        /> */}
        {isUploading ? (
          <div className={styles.uploading}>
            <Spinner>uploading</Spinner>{' '}
          </div>
        ) : (
          <FileInput label={label} onChange={handleChange} />
        )}
      </div>
      <p className={styles.text}>{children} </p>
    </div>
  );
}

// export function UploadDocs() {

// }

function FileInput({ label, onChange }) {
  return (
    <label htmlFor={label} className={styles.custom}>
      <input
        id={label}
        name={label}
        className={styles.file}
        type="file"
        onChange={(e) => onChange(e)}
      />
      <span>Choose file</span>
    </label>
  );
}
