import { useMemo } from 'preact/hooks';
import { FileUploader, Button } from '@carbon/react';
import { container, spacer, uploadButton } from './Home.module.css';

const Spacer = () => <div className={spacer}></div>


export function Home() {
  const aborter = useMemo(() => new AbortController());

  async function identifyImage(event) {
    const image = event.target.files[0];

    let mimeType = image.type || {
      'avif': 'image/avif',
      'bmp': 'image/bmp',
      'gif': 'image/gif',
      'jpeg': 'image/jpeg',
      'jpg': 'image/jpeg',
      'png': 'image/png',
      'tif': 'image/tiff',
      'tiff': 'image/tiff',
      'webp': 'image/webp',
    }[image.name.split('.').at(-1).toLowerCase()];

    if (!mimeType) {
      alert('Unrecognized file type!');
      return;
    }

    aborter.abort();

    const dataUrl = await new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(image);
    });
    const base64 = dataUrl.slice('data:*/*;base64,'.length);

    await fetch('https://www.plant.id/api_frontend/identify_sample', {
      method: 'POST',
      body: `{"images":["data:${mimeType};base64,${base64}"]}`,
      signal: aborter.signal,
    });
  }

  return (
    <div className={container}>
      <h1>Welcome to Botanical Thyme</h1>
      <Spacer />
      <p>
        The app that helps you search and identify information about the plants
        and herbs around you.
      </p>

      <div className={uploadButton}>
        <FileUploader
          labelTitle="Upload image"
          labelDescription="Upload an image of a plant to identify it."
          buttonLabel="Add image"
          multiple={false}
          accept={['.avif','.bmp','.gif','.jpeg','.jpg','.png','.tif','.tiff','.webp']}
          onChange={identifyImage}
        />
      </div>
      <h2>About</h2>
      <br/>
      <p>
        Botanical Thyme was created for <a href="https://smathhacks.ncssm.edu">
        SMathHacks 2024</a> with the goal of helping people to identify plants
        around them, as well as indentify endangered species of plants to help
        protect these plants further.
      </p>
      <Spacer />
    </div>
  );
}
