import * as path from "path";
// tslint:disable:no-implicit-dependencies
import { mergeTypeDefs } from "@graphql-tools/merge";
// tslint:disable:no-implicit-dependencies
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  recursive: true,
});
typesArray.shift();

const typesMerged = mergeTypeDefs(typesArray);

export default typesMerged;
