import ejs from "ejs";
import path from "path";

const dirServer = path.join(process.cwd(), 'src', 'server')
const fragments = path.join(dirServer, 'fragments');

const renderFile = (url) => {
  return new Promise((res, rej) => {
    ejs.renderFile(url, { f: fragments }, null, (err, str) => {
      if (err) {
        rej(err);
      }

      res(str);
    });
  });
};

export default renderFile;
