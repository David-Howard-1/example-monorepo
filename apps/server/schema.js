import { createSchema } from 'graphql-yoga';
import { GraphQLError } from 'graphql';

const books = [
  {
    id: '1',
    name: 'Book name',
    year: 2014,
    reviews: [
      {
        id: '11',
        rating: 5,
        userId: '21',
      },
      {
        id: '12',
        rating: 3,
        userId: '22',
      },
      {
        id: '13',
        rating: 4.5,
        userId: '23',
      },
    ],
  },
  {
    id: '2',
    name: 'War and Peace',
    year: 1868,
    reviews: [],
  },
];

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Book {
      id: ID!
      title: String
      year: Int
      isAuthor(userId: ID!): Boolean!
      reviews(first: Int, sort: SortOrder): [Review!]
    }

    type Review {
      id: ID!
      rating: Float
      userId: ID!
    }

    enum SortOrder {
      ASC
      DESC
    }

    type Query {
      hello: String
      greet(name: String!): String
      book(id: ID!): Book
    }

    type Mutation {
      createBook(title: String!, year: Int): Book
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
      greet: (root, args, ctx, info) => `hello, ${args.name}`,
      book: (root, args, ctx, info) => {
        console.log(`--> resolving books query`);
        const bookById = books.find((book) => book.id === args.id);
        console.log(bookById);
        return bookById;
      },
    },
    Mutation: {
      createBook: (root, { title, year }, ctx, info) => {
        const titleExists = books.findIndex((book) => book.title === title);

        if (titleExists !== -1) {
          throw new GraphQLError(`Book ${title} already exists`);
        }

        const book = {
          id: (books.length + 1).toString(),
          name: title,
          year: year,
          reviews: [],
        };

        books.push(book);

        return book;
      },
    },
    Book: {
      id: (root, args, ctx, info) => {
        console.log(`--> resolving Book type`);
        return root.id;
      },
      title: (root, args, ctx, info) => root.name,
      year: (root, args, ctx, info) => root.year,
      isAuthor: (root, args, ctx, info) => args.userId === '3',
      reviews: (root, args, ctx, info) => {
        const array = root.reviews;

        if (args.sort === 'DESC') {
          array.sort((a, b) => b.id - a.id);
        } else {
          array.sort((a, b) => a.id - b.id);
        }

        return array.slice(0, args.first);
      },
    },
    Review: {
      id: (root, args, ctx, info) => {
        console.log(`--> resolving Review type`);
        return root.id;
      },
      rating: (root, args, ctx, info) => root.rating,
      userId: (root, args, ctx, info) => root.userId,
    },
  },
});

// Query lifecycle

// Query is made
/* GraphQL */ `
mutation CreateBook {
  createBook(title: "New Book", year: 2024) {
    id
    title
    year
    reviews {
      id
      rating
    }
  }
}
`;
