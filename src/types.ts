import type { DataviewInlineApi } from 'obsidian-dataview';

export type GetHeadingsListProps = {
  dv: DataviewInlineApi;
  root: string;
  filesToSkip?: string[];
  headingLevel?: number;
  randomize?: boolean;
};
