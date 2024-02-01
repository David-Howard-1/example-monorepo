import Fastify from 'fastify';
import { mercurius } from 'mercurius';
import { schema } from './graphql/schema/index.js';

const app = Fastify({});

app.register(mercurius, {
  schema: schema,
  graphiql: true,
});

try {
  await app.listen({ port: 8080 });
  console.log(`Fastify server listening on http://localhost:8080`);
  console.log(`GraphQL server listening on http://localhost:8080/graphiql`);
} catch (error) {
  process.exit(1);
}
