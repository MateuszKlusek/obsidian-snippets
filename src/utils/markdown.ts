import { TreeNode } from './tree';

export const generateMarkdownTree = (node: TreeNode, depth = 0): string => {
  let output = '';
  const keys = Object.keys(node).sort();

  keys.forEach((key) => {
    // 2 spaces per indentation depth layer
    const indent = '  '.repeat(depth);
    output += `${indent}- ${key}\n`;

    output += generateMarkdownTree(node[key], depth + 1);
  });

  return output;
};
