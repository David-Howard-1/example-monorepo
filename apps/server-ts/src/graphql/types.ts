export type BookFromDatabase = {
  id: string;
  name: string;
  reviews: ReviewFromDatabase[];
};

export type ReviewFromDatabase = {
  id: string;
  review: number;
};

export type SchemaRootTypes = {
  Scalars: {
    ID: {
      Input: string;
      Output: string;
    };
  };
  Objects: {
    Book: BookFromDatabase;
    Review: ReviewFromDatabase;
  };
};
