export type TreeNode = {
  [key: string]: TreeNode;
};

export const buildTree = (paths: string[][]): TreeNode => {
  const root: TreeNode = {};

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
