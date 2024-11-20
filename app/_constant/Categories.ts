export type Category = {
  cover: string;
  cover_alt: string;
  identifier: string;
  link_title: string;
  title: string;
};
export type CategoryResponse = {
  count: number;
  next: string;
  previous: null;
  results: Category[];
};
export type SingleCategory = {
  archive_text: string | null;
  canonical: string | null;
  cover: string;
  cover_alt: string;
  heading: string;
  identifier: string;
  index: boolean;
  link_title: string;
  main_text: string;
  seo_description: string;
  seo_title: string;
  title: string;
};
