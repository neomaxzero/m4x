import fs from 'fs';
import path from 'path'
import _dirname from '../dirname.mjs';

const getPage = (url) => {
    const pathPage =  path.resolve(_dirname, `../pages`, `${url}.html`)
    return fs.readFileSync(pathPage, { encoding: 'utf-8'})
}

export default getPage;