import { convertFromDirectory } from "joi-to-typescript";

convertFromDirectory({
  schemaDirectory: "src/app/schema",
  typeOutputDirectory: "src/app/type/schema",
});
