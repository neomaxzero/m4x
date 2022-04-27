import _dirname from './dirname.mjs';
import getPage from './renderer/getPage';
// import getFragments from "./renderer/getFragments";

// const fragmentsMap = getFragments();


export const render = async (url) => {
    if (url === '/') {
        return getPage('index');
    }
    console.log(url);
    return `<h1>test</h1>`
}
console.log('wot')
export default render;
