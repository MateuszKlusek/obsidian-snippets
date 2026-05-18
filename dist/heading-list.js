const getHeadingsList = async ({
  dv: dv2,
  root,
  // TODO: add handing nested filesToSkip, currently it's only checking file names, regardless of the path
  filesToSkip = [],
  headingLevels = [1, 2, 3, 4],
  randomize = false,
}) => {
  if (!root) return '';
  const elementsToReturn = [];
  const pages = dv2
    .pages(`"${root}"`)
    .filter((p) => !filesToSkip.includes(p.file.name));
  for (const page of pages.values) {
    const file = dv2.app.vault.getAbstractFileByPath(page.file.path);
    const cache = dv2.app.metadataCache.getFileCache(file);
    for (const heading of cache?.headings ?? []) {
      if (!headingLevels?.includes(heading.level)) continue;
      const headerName = heading.heading;
      const wikiLink = `[[${file?.path}#${headerName}|${headerName}]]`;
      elementsToReturn.push(wikiLink);
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
dv.paragraph('getHeadingsList implementation');
window.getHeadingsList = getHeadingsList;
