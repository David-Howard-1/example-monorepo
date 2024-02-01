import { builder } from "../builder";
import { printSchema } from "graphql";
import fs from 'fs';

// import all typedefs/queries/mutation files
import './book.js';
import './review.js';

export const schema = builder.toSchema();
const schemaAsString = printSchema(schema);
fs.writeFileSync('schema.graphql', schemaAsString);