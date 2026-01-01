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
  headingLevel: 1,
  randomize: true,
});
```

## CSS Snippets

### Neutralize Flashing Effect

### Clean Up Note Title
