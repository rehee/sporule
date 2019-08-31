import MarkdownHandler from 'markdown-handler';

let instance = null;

export default class PostResources {
    constructor() {
        if (!instance) {
            const context = require.context("../../posts", false, /\.md$/)
            this.defaultPaths = context.keys().map(context);
            instance = this;
        }
        return instance;
    }

    getAll(page, paths = this.defaultPaths, filterCategories = [], filterTags = []) {
        if (paths.length <= 0) {
            paths = this.defaultPaths;
        }
        let mdHandler = new MarkdownHandler();
        mdHandler.filterCategories = filterCategories;
        mdHandler.filterTags = filterTags;
        mdHandler.excerptLength=100;
        return mdHandler.loadMds(paths, page);
    }
}