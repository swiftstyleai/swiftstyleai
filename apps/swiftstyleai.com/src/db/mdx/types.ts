// Define the Metadata type.
export interface Metadata {
  title: string;
  description: string;
  permalink: string;
  publishedDate: string;
  updatedDate?: string;
  category?: string;
  layout?: string;
  lang?: string;
  tags?: Array<{ slug: string; title: string; display?: boolean }>;
  translations?: Array<{ locale: string; permalink: string }>;
  cover?: MetadataCover;
  author?: MetadataAuthor;
  [key: string]: any; // Allow for additional dynamic keys.
}

export interface MetadataCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MetadataAuthor {
  name: string;
  avatar: string;
  title: string;
  x: string;
}
