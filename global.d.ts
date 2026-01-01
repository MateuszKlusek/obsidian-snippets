import type { DataviewInlineApi } from 'obsidian-dataview';
import type types = require('./src/types');

declare global {
  interface Window {
    getHeadingsList: (props: types.GetHeadingsListProps) => void;
  }
  const dv: DataviewInlineApi;
}
