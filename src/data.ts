export interface Action {
  id: string;
  label: string;
  primary?: boolean;
}

export interface PwaFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  actions: Action[];
}

export const pwaFeatures: PwaFeature[] = [
  {
    id: 'clipboard',
    icon: '📋',
    title: 'Clipboard API',
    description: 'Copy and read text and files using the modern Clipboard API',
    actions: [
      { id: 'copy', label: 'Copy Text', primary: true },
      { id: 'copy-image', label: 'Copy Image', primary: false},
      { id: 'read-text', label: 'Read Text', primary: false },
      { id: 'read-files', label: 'Read Files', primary: false },
    ],
  },
  {
    id: 'share',
    icon: '🔄',
    title: 'Web Share API',
    description: 'Share files and content with other applications',
    actions: [{ id: 'share-files', label: 'Share Files', primary: true }],
  },
  {
    id: 'contacts',
    icon: '👥',
    title: 'Contacts API',
    description: 'Access user contacts with permission',
    actions: [{ id: 'pick-contacts', label: 'Pick Contacts', primary: true }],
  },
  {
    id: 'idle-detection',
    icon: '⏰',
    title: 'Idle Detection',
    description: 'Detect when users are inactive',
    actions: [
      { id: 'idle-detector', label: 'Start Idle Detector', primary: true },
    ],
  },
  {
    id: 'content-indexing',
    icon: '🔍',
    title: 'Content Indexing',
    description: 'Index content for offline access',
    actions: [{ id: 'index', label: 'Index Content', primary: true }],
  },
  {
    id: 'font-access',
    icon: '🔤',
    title: 'Font Access',
    description: 'Access system fonts with permission',
    actions: [{ id: 'access-fonts', label: 'Access Fonts', primary: true }],
  },
  {
    id: 'pick-text-file',
    icon: '📄',
    title: 'Text File Picker',
    description: 'Select and read text files from the device',
    actions: [
      { id: 'pick-text-file-btn', label: 'Pick Text File', primary: true },
    ],
  },
  {
    id: 'pick-files',
    icon: '📁',
    title: 'File Picker',
    description: 'Select multiple files from the device',
    actions: [{ id: 'pick-files-btn', label: 'Pick Files', primary: true }],
  },
  {
    id: 'write-files',
    icon: '💾',
    title: 'File System Access',
    description:
      'Write files to the device storage, this example creates, adds content and saves the file',
    actions: [
      { id: 'write-text-file', label: 'Create & Save File', primary: true },
      {
        id: 'write-html-file',
        label: 'Create & Save HTML Template',
      },
    ],
  },
];
