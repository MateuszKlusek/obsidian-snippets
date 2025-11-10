import type { DataviewInlineApi } from "obsidian-dataview";

declare global {
  interface Window {
    getHeadingsList: (
      dv: DataviewInlineApi,
      root: string,
      filesToSkip: string[],
      randomize: boolean
    ) => void;
  }
  const dv: DataviewInlineApi;
}
