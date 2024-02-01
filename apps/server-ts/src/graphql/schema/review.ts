import { builder } from '../builder';

builder.objectType('Review', {
  description: 'User review',
  fields: (t) => ({
    id: t.exposeID('id'),
    review: t.exposeFloat('review'),
  }),
});
