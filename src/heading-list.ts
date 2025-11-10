import type { DataviewInlineApi } from 'obsidian-dataview';

/**
I'm using this function to get a list of headings from a given root and then display them in a list, with an option to randomize the order.
  
dv is a global object that is provided by the Obsidian Dataview API. (dv is a default identifier, it can be adjusted in the Obsidian settings)
  
This is a loading script, window.getHeadingsList is used to attach a function to the window object of the Electron app and then call it in other scripts with:
  
 ```dataviewjs
	await window.getHeadingsList(dv, "Git", ["Outline"], true)
  ```
 */

const getHeadingsList = async (
  dv: DataviewInlineApi,
  root: string,
  filesToSkip: string[],
  randomize: boolean,
) => {
  if (!root) return '';

  const elementsToReturn: string[] = [];

  const pages = dv
    .pages(`"${root}"`)
    .filter((p) => !filesToSkip.includes(p.file.name));

  for (const page of pages) {
    const content = await dv.io.load(page.file.path);
    if (!content) continue;

    const lines = content.split('\n');

    for (const line of lines) {
      if (line.startsWith('####')) {
        const headerText = line.replace(/^####\s*/, '');
        const link = `[[${page.file.name}#${headerText}|${headerText}]]`;
        elementsToReturn.push(link);
      }
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
