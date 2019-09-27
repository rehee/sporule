import MarkdownHandler from 'markdown-handler';
import Hash from 'object-hash';
import { store } from "../index";
import * as PostHelper from "../helpers/postHelper";

let instance = null;

export default class PostResources {
    constructor() {
        if (!instance) {
            const context = require.context("../../posts", false, /\.md$/)
            console.log(process.env.ROUTE);
            this.defaultPaths = context.keys().map(context);
            console.log(this.defaultPaths);
            instance = this;
        }
        return instance;
    }

    getAll(paths = this.defaultPaths, forceUpdate = false) {
        const states = store.getState();
        const newHash = Hash(paths);
        if (newHash == states.posts.hash && !forceUpdate) {
            //check hash to see if we should update or not
            return new Promise((resolve, reject) => {
                resolve(null);
            })
        }
        let mdHandler = new MarkdownHandler();
        return mdHandler.loadMds(paths).then(posts => {
            posts.hash = newHash;
            posts.categories = PostHelper.getCategories(posts);
            posts.tags = PostHelper.getTags(posts);
            posts = PostHelper.addLink(posts);
            return new Promise((resolve, reject) => {
                resolve(posts);
            });
        });
    }
}