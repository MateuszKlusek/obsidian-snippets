'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const getHeadingsList = async (dv, root, filesToSkip, randomize) => {
  if (!root) return '';
  const elementsToReturn = [];
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
