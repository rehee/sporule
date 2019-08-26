import MarkdownHandler from 'markdown-handler';

let instance = null;

export default class PostResources{
    constructor() {
        if(!instance){
            const context = require.context("../../posts", false, /\.md$/)
            this.defaultPaths = context.keys().map(context);
            instance =this;
        }
        return instance;
      }
    
    getAll(page,paths = this.defaultPaths){
        return MarkdownHandler.loadMds(paths,page);
    }
}