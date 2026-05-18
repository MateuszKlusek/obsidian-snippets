import type { DataviewInlineApi } from 'obsidian-dataview';
import type types = require('./src/types/types');

declare global {
  interface Window {
    getHeadingsList: (props: types.GetHeadingsListProps) => void;
    getVaultFolderStructure: (
      props: types.GetVaultFolderStructureProps,
    ) => void;
  }
  const dv: DataviewInlineApi;
}
