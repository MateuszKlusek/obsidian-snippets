# Obsidian Snippets

This is a collection of snippets for Obsidian, I'm using them to speed up my workflow and to learn more about the Obsidian API.

## Scripts

### Heading List

This is a snippet that I'm using to get a list of headings from a given root and then display them in a list, with an option to randomize the order.

the heading list script needs to be leaded in the Obsidian app, before it can be called in other scripts with

used with ```dataviewjs code section

```ts
await window.getHeadingsList({
  dv: dv,
  root: 'Git',
  filesToSkip: ['Outline'],
  headingLevels: [1, 2],
  randomize: true,
});
```

### Vault Folder Structure

This is a snippet that I'm using to get a list of folder structure from the vault and copy it to the clipboard.

used with ```dataviewjs code section

```ts
await window.getVaultFolderStructure({ dv });
```

## CSS Snippets

### Neutralize Flashing Effect

By deafult, Obsidian has a flashing effect when you navigate to a note from a link, this CSS snippet is used to remove it.

### Clean Up Note Title

This CSS snippet is used to clean up a note title to make it look like a normal text, to be more distinguishable from the the h1 text.

## Misc

### dv

it's a global object provided by Obsidian Dataview API. It needs to be referenced/passed as a parameter, not imported.
