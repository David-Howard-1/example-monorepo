import SchemaBuilder from '@pothos/core';
import { SchemaRootTypes } from './types.js';

export const builder = new SchemaBuilder<SchemaRootTypes>({});

builder.queryType({});

builder.queryField('ping', (t) =>
  t.string({ resolve: (root, args, ctx, info) => `Pong!` })
);
