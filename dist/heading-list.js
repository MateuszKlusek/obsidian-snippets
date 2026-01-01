const getHeadingsList = async ({
  dv: dv2,
  root,
  filesToSkip = [],
  headingLevel = 1,
  randomize = false,
}) => {
  if (!root) return '';
  const elementsToReturn = [];
  const pages = dv2
    .pages(`"${root}"`)
    .filter((p) => !filesToSkip.includes(p.file.name));
  for (const page of pages) {
    const content = await dv2.io.load(page.file.path);
    if (!content) continue;
    const lines = content.split('\n');
    for (const line of lines) {
      if (isHeadingLevel(line, headingLevel)) {
        const headerText = line.replace(`#${headingLevel} `, '');
        const link = `[[${page.file.name}${headerText}|${headerText}]]`;
        elementsToReturn.push(link);
      }
    }
  }
  if (!randomize) {
    elementsToReturn.forEach((elem, _) => {
      dv2.paragraph(elem);
    });
  } else {
    elementsToReturn
      .sort(() => Math.random() - 0.5)
      .forEach((elem, _) => {
        dv2.paragraph(elem);
      });
  }
};
function isHeadingLevel(line, level) {
  const regex = new RegExp(`^#{${level}}\\s`);
  return regex.test(line);
}
dv.paragraph('getHeadingsList implementation');
window.getHeadingsList = getHeadingsList;
