import renderFile from "./utils/renderFile";

export const render = async (url) => {
    if (url === '/') {
        return renderFile('src/server/pages/index.ejs') 
    }
    if (url === '/about') {
        return renderFile('src/server/pages/about.ejs') 
    }
}
