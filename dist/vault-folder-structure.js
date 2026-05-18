const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy folder structure to clipboard: ', err);
    return false;
  }
};
const generateMarkdownTree = (node, depth = 0) => {
  let output = '';
  const keys = Object.keys(node).sort();
  keys.forEach((key) => {
    const indent = '  '.repeat(depth);
    output += `${indent}- ${key}
`;
    output += generateMarkdownTree(node[key], depth + 1);
  });
  return output;
};
const buildTree = (paths) => {
  const root = {};
  for (const path of paths) {
    let current = root;
    for (const segment of path) {
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    }
  }
  return root;
};
const getVaultFolderStructure = async ({ dv: dv2 }) => {
  const folderData = dv2.app.vault
    .getAllLoadedFiles()
    .filter((file) => file.parent && file.children)
    .map((file) => file.path.split('/'));
  const tree = buildTree(folderData);
  const markdownTree = generateMarkdownTree(tree);
  const formattedOutput = `\`\`\`
${markdownTree}\`\`\``;
  await copyToClipboard(formattedOutput);
  return formattedOutput;
};
window.getVaultFolderStructure = getVaultFolderStructure;
dv.paragraph('getVaultFolderStructure implementation');
