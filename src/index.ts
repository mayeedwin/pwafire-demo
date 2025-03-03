import { pwa } from 'pwafire';

// Create a reusable dialog for messages
const createDialogElement = () => {
  // Check if dialog already exists
  let dialog = document.getElementById('pwa-dialog') as HTMLDialogElement;

  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'pwa-dialog';
    dialog.className = 'pwa-dialog';
    dialog.innerHTML = `
      <div class="dialog-content">
        <p class="dialog-message"></p>
        <div class="dialog-image-container"></div>
        <form method="dialog">
          <button class="dialog-button">Close</button>
        </form>
      </div>
    `;

    // Add some basic styles
    const style = document.createElement('style');
    style.textContent = `
      .pwa-dialog {
        padding: 1rem;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        min-width: 400px;
        max-width: 400px;
        margin: auto;
      }
      .pwa-dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
      }
      .dialog-button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #24292f;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .dialog-image-container {
        margin-top: 1rem;
        text-align: center;
      }
      .dialog-image-container img {
        max-width: 100%;
        border-radius: 4px;
        border: 1px solid #d0d7de;
      }
      .copy-image-btn {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        background: #0969da;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(dialog);
  }

  return dialog;
};

// Show message in dialog
const showDialog = (message: string, imageUrl?: string) => {
  const dialog = createDialogElement();
  const messageElement = dialog.querySelector('.dialog-message');
  const imageContainer = dialog.querySelector('.dialog-image-container');

  if (messageElement) {
    messageElement.textContent = message;
  }

  if (imageContainer) {
    if (imageUrl) {
      imageContainer.innerHTML = `
        <img src="${imageUrl}" alt="Example image" />
        <button class="copy-image-btn" id="copy-dialog-image">Copy Image</button>
      `;

      const copyBtn = document.getElementById('copy-dialog-image');
      copyBtn?.addEventListener('click', async () => {
        try {
          const res = await pwa.copyImage(imageUrl);
          if (res.ok) {
            messageElement!.textContent =
              'Image copied to clipboard successfully!';
          } else {
            messageElement!.textContent = res.message;
          }
        } catch (error) {
          messageElement!.textContent =
            'Failed to copy image: ' + (error as Error).message;
        }
      });
    } else {
      imageContainer.innerHTML = '';
    }
  }

  dialog.showModal();
};

// Get action btns.
const copyText = document.getElementById('copy');
const copyImage = document.getElementById('copy-image');
const readText = document.getElementById('read-text');
const readFiles = document.getElementById('read-files');
const shareFiles = document.getElementById('share-files');
const shareFileInput = document.getElementById('share-file-input');
const pickContacts = document.getElementById('pick-contacts');
const idleDetectorBtn = document.getElementById('idle-detector');
const indexBtn = document.getElementById('index');
const accessFonts = document.getElementById('access-fonts');
const pickTextFile = document.getElementById('pick-text-file-btn');
const pickFiles = document.getElementById('pick-files-btn');
const writeTextFile = document.getElementById('write-text-file');
const writeHTMLFile = document.getElementById('write-html-file');

// Copy text...
const text = 'I am the text copied';

// Copy text
copyText?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const res = await pwa.copyText(text);
  if (res.ok) {
    showDialog(`Text copied: "${text}"`);
  } else {
    showDialog(res.message);
  }
});

// Copy image
copyImage?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  // Example image URL
  const imageUrl =
    'https://img.freepik.com/free-psd/watercolor-painting-three-dark-red-roses-with-green-leaves-stems-beautiful-botanical-illustration_632498-28890.jpg?t=st=1741033927~exp=1741037527~hmac=f7b2116ea62c3afe2b6727076af79ac7dcf48e0d23c3eb6358cc15a4843ffc6a&w=740';

  showDialog(
    'Click the button below to copy this image to clipboard:',
    imageUrl
  );
});

// Read text
readText?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const res = await pwa.readText();
  if (res.ok) {
    showDialog(`Read text: "${res.text}"`);
  } else {
    showDialog(res.message);
  }
});

// Read files
readFiles?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const res = await pwa.readFiles();
  if (res.ok && res.files.length > 0) {
    showDialog(`Read ${res.files.length} file(s)`);
  } else {
    showDialog(res.message || 'No files found');
  }
});

// Handle file input changes
shareFileInput?.addEventListener('click', (e) => {
  e.stopPropagation();
});

shareFileInput?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement;
  const fileCount = target.files?.length || 0;
  if (fileCount > 0 && shareFiles) {
    shareFiles.textContent = `Share ${fileCount} ${
      fileCount === 1 ? 'File' : 'Files'
    }`;
  }
});

// Share files
shareFiles?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!shareFileInput) {
    showDialog('File input not found');
    return;
  }

  const filesInput = shareFileInput as HTMLInputElement;
  if (!filesInput.files || filesInput.files.length === 0) {
    showDialog('Please select at least one file to share');
    return;
  }

  const data = {
    title: 'Shared from PWAFire Demo',
    text: 'Check out these files I shared using the Web Share API!',
    files: filesInput.files,
  };

  const res = await pwa.Share(data as any);
  showDialog(res.message);
});

// Pick contacts
pickContacts?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const props = ['name', 'email', 'tel'];
  const options = { multiple: true };
  const res = await pwa.Contacts(props, options);

  if (res.ok) {
    showDialog(`Selected ${res.contacts.length} contact(s)`);
  } else {
    showDialog(res.message);
  }
});

// Idle Detection
idleDetectorBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const action = 'start';
  const callback = () => {
    showDialog('App is idle!');
  };

  const res = await pwa.idleDetection(action, callback);
  if (res.ok) {
    showDialog(
      'Idle detection started. The app will alert you when you become inactive.'
    );
  } else {
    showDialog(res.message);
  }
});

// Content Indexing
indexBtn?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const index = await pwa.contentIndexing();
  if (index && index.ok && typeof index.addItem === 'function') {
    showDialog(index.message);
    try {
      const res = await index.addItem({
        id: 'indexing',
        url: 'indexing',
        title: 'Test Indexing',
        description: 'Amazing article about content indexing',
        icons: [
          {
            src: 'https://cdn.glitch.global/60bc65b2-b810-494a-a4a0-ae27fc4fe9df/GDE%20Badge%20Large%202.jpeg?v=1643646538659',
            sizes: '64x64',
            type: 'image/png',
          },
        ],
        category: 'article',
      });

      if (res.ok) {
        showDialog(res.message);
      }
    } catch (error) {
      showDialog('Error adding item: ' + (error as Error).message);
    }
  } else {
    showDialog(index.message);
  }
});

// Font Access
accessFonts?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const res = await pwa.accessFonts();
  showDialog(res.message);
});

// Pick Text File
pickTextFile?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const res = await pwa.pickTextFile();
  showDialog(res.message);
});

// Pick Files
pickFiles?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const res = await pwa.pickFile({
    types: [
      {
        description: 'Files',
        // accept: {
        //   'text/plain': ['.txt'],
        // },
        multiple: true,
      },
    ],
  });
  showDialog(res.message);
});

// Write Text File
writeTextFile?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const { handle } = await pwa.createFile();
  if (handle) {
    const res = await pwa.writeFile(handle, 'Hello World, I am a text file');
    showDialog(res.message);
  }
});

// Write HTM File
writeHTMLFile?.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const { handle } = await pwa.createFile({
    types: [
      {
        description: 'HTML Template',
        accept: {
          'text/plain': ['.html'],
        },
      },
    ],
  });

  if (handle) {
    const res = await pwa.writeFile(
      handle,
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <main>
            <p>Welcome to pwafire, a progressive web app apis and tools library</p>
          </main>
        </body>
      </html>
      `
    );
    showDialog(res.message);
  }
});
