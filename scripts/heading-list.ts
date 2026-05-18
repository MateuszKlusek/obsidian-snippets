/**
I'm using this function to get a list of headings from a given root and then display them in a list, with an option to randomize the order.
  
dv is a global object that is provided by the Obsidian Dataview API. (dv is a default identifier, it can be adjusted in the Obsidian settings)
  
This is a loading script, window.getHeadingsList is used to attach a function to the window object of the Electron app and then call it in other scripts with:
  
 ```dataviewjs
	await window.getHeadingsList({dv, root: "Git", filesToSkip: ["Outline"], randomize: true, })
  ```
 */

import { TFile } from 'obsidian';
import type { GetHeadingsListProps } from '../src/types/types';

const getHeadingsList = async ({
  dv,
  root,
  filesToSkip = [],
  headingLevels = [1, 2, 3, 4],
  randomize = false,
}: GetHeadingsListProps) => {
  if (!root) return '';

  const elementsToReturn: string[] = [];

  const pages = dv
    .pages(`"${root}"`)
    .filter((p) => !filesToSkip.includes(p.file.name));

  for (const page of pages.values) {
    const file = dv.app.vault.getAbstractFileByPath(page.file.path);
    const cache = dv.app.metadataCache.getFileCache(file as TFile);

    for (const heading of cache?.headings ?? []) {
      if (!headingLevels?.includes(heading.level)) continue;

      const headerName = heading.heading;
      const wikiLink = `[[${file?.path}#${headerName}|${headerName}]]`;

      elementsToReturn.push(wikiLink);
    }
  }

  if (!randomize) {
    elementsToReturn.forEach((elem, _) => {
      dv.paragraph(elem);
    });
  } else {
    elementsToReturn
      .sort(() => Math.random() - 0.5)
      .forEach((elem, _) => {
        dv.paragraph(elem);
      });
  }
};

dv.paragraph('getHeadingsList implementation');

window.getHeadingsList = getHeadingsList;
