import fs from "fs";
import path from "path";
import _dirname from "../dirname.mjs";


const getFragments = () => {
  const pathFragments = path.resolve(_dirname, "../fragments");

  const fragments = fs.readdirSync(pathFragments);

  return fragments.map((fragment) => {
    const template = fs.readFileSync(path.join(pathFragments, fragment), { encoding: 'utf-8'})
    return {
        [fragment]: template 
    }

  })
};

export default getFragments;
