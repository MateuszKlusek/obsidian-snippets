import { TFolder } from 'obsidian';
import type { GetVaultFolderStructureProps } from '../src/types/types';
import { copyToClipboard } from '../src/utils/clipboard';
import { generateMarkdownTree } from '../src/utils/markdown';
import { buildTree } from '../src/utils/tree';

/**
I'm using this function to get a list of folder structure from the vault and copy it to the clipboard.
  
dv is a global object that is provided by the Obsidian Dataview API. (dv is a default identifier, it can be adjusted in the Obsidian settings)
  
This is a loading script, window.getVaultFolderStructure is used to attach a function to the window object of the Electron app and then call it in other scripts with:
  
```dataviewjs
	await window.getVaultFolderStructure({dv})
```
 */

const getVaultFolderStructure = async ({
  dv,
}: GetVaultFolderStructureProps): Promise<string> => {
  const folderData = dv.app.vault
    .getAllLoadedFiles()
    // Filters out files, tracking only folder paths
    .filter((file) => file.parent && (file as TFolder).children)
    .map((file) => file.path.split('/'));

  const tree = buildTree(folderData);
  const markdownTree = generateMarkdownTree(tree);

  const formattedOutput = `\`\`\`\n${markdownTree}\`\`\``;

  await copyToClipboard(formattedOutput);

  return formattedOutput;
};

window.getVaultFolderStructure = getVaultFolderStructure;

dv.paragraph('getVaultFolderStructure implementation');
