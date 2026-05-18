// Dataview API doesn't provide types for the data it returns, so we need to construct them manually.
// might be flawed, but it's a start.

interface DataviewDateTime {
  ts: number;
  _zone: any;
  loc: any;
  invalid: null | string;
  weekData: null | any;
}

interface DataviewLink {
  path: string;
  display: string | undefined;
  subpath: string | undefined;
  embed: boolean;
  type: string;
}

interface DataArrayImpl<T = any> {
  values: T[];
  settings: Record<string, any>;
  length: number;
  defaultComparator: (...args: any[]) => number;
}

export interface ObsidianPageMetadata {
  path: string;
  folder: string;
  name: string;
  ext: string;
  size: number;
  starred: boolean;

  frontmatter: Record<string, any>;
  aliases: DataArrayImpl<string>;

  cday: DataviewDateTime;
  ctime: DataviewDateTime;
  mday: DataviewDateTime;
  mtime: DataviewDateTime;

  link: DataviewLink;
  inlinks: DataArrayImpl<DataviewLink>;
  outlinks: DataArrayImpl<DataviewLink>;

  tags: DataArrayImpl<string>;
  etags: DataArrayImpl<string>;
  lists: DataArrayImpl<any>;
  tasks: DataArrayImpl<any>;
}
