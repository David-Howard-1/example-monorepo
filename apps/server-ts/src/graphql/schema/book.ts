import { builder } from '../builder';
import { BookFromDatabase } from '../types';

const books: BookFromDatabase[] = [
  {
    id: '1',
    name: 'My First Book',
    reviews: [
      {
        id: '1',
        review: 3.4,
      },
    ],
  },
];

builder.objectType('Book', {
  //  name: 'Book',
  description: '',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    reviews: t.field({
      type: ['Review'],
      resolve: (root, args, ctx, info) => root.reviews,
    }),
  }),
});

builder.queryField('book', (t) =>
  t.field({
    type: 'Book',
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (root, args, ctx, info) => {
      const bookById = books.find((book) => args.id === book.id);
      return bookById;
    },
  })
);
