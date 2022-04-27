import path from "path";
import { fileURLToPath } from "url";

const _dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default _dirname;
