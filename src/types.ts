export type StrapiProjectsListData = {
  id: number;
  attributes: {
    slug: string;
    projectTitle: string;
    studentList: {
      id: number;
      name: string;
    }[];
    thumbnail: {
      data: {
        attributes: StrapiComponentImage;
      };
    };
  };
}[];

export type StrapiComponentImage = {
  width: number;
  height: number;
  url: string;
  caption?: string;
  alternativeText?: string;
};