import Config from "../../_config";
import * as Utility from "./utility";

export const getPinnedPosts = (posts) => {
    let tempPosts = { ...posts };
    tempPosts = sortPost(tempPosts);
    let pinnedPosts = tempPosts.items.filter(post => post.metas.pinned)
    if (pinnedPosts.length < 1) {
        pinnedPosts = tempPosts.items.slice(0, 10);
    }
    tempPosts.items = pinnedPosts;
    return tempPosts;
}

export const removeFuturePosts = (posts) => {
    //remove future and posts with no date
    let tempPosts = { ...posts };
    tempPosts.items = tempPosts.items.filter(post => {
        if (post.metas.date && post.metas.date != "null") {
            return new Date(post.metas.date) <= new Date();
        }
        return false;
    })
    return tempPosts;
}

export const sortPost = (posts, isDesc = true) => {
    let tempPosts = removeFuturePosts({ ...posts });
    tempPosts.items = tempPosts.items.sort((a, b) => {
        let dateA = new Date(a.metas.date);
        let dateB = new Date(b.metas.date);
        return isDesc ? dateB - dateA : dateA - dateB;
    })
    return tempPosts;
}

export const addLink = (posts) => {
    let tempPosts = { ...posts };
    tempPosts.items = tempPosts.items.map(o => {
        o.link = o.path.replace(".md", "");
        return o;
    })
    return tempPosts;
}

export const getCategories = (posts) => {
    let tempPosts = { ...posts };
    let categories = [];
    tempPosts.items.forEach(item => {
        item.metas.categories.forEach(o => {
            if (!categories.includes(o)) {
                categories.push(o);
            }
        })
    });
    return categories;
}

export const getTags = (posts) => {
    let tempPosts = { ...posts };
    let tags = [];
    tempPosts.items.forEach(item => {
        item.metas.tags.forEach(o => {
            if (!tags.includes(o)) {
                tags.push(o);
            }
        })
    });
    return tags;
}

export const getPostsByPage = (posts, page, excludePinned, searchString, categories, tags) => {
    if (posts.length > 0) {
        let tempPosts = { ...posts };
        tempPosts = postsFilter(tempPosts, excludePinned, searchString, categories, tags);
        tempPosts = sortPost(tempPosts);
        const postsSize = tempPosts.items.length;
        const itemsPerPage = page > 0 ? Config.postPerPage : 99999999;
        const totalPages = Math.ceil(postsSize / itemsPerPage);
        tempPosts.items = tempPosts.items.slice((page - 1) * itemsPerPage, (page) * itemsPerPage);
        tempPosts.totalPages = totalPages;
        tempPosts.itemsPerPage = itemsPerPage;
        tempPosts.hasPrevPage = page > 1;
        tempPosts.hasNextPage = page < totalPages;
        tempPosts.invalidPage = page > totalPages;
        tempPosts.page = page;
        return tempPosts;
    }
    return posts;
}

export const postsFilter = (posts, excludePinned, searchString, categories, tags) => {
    let tempPosts = { ...posts };
    if (searchString) {
        tempPosts.items = tempPosts.items.filter(o => o.title.includes(searchString));
    }
    if (excludePinned) {
        tempPosts.items = tempPosts.items.filter(o => {
            return !o.metas.pinned;
        })
    }
    if (categories.length > 0) {
        tempPosts.items = tempPosts.items.filter(o => {
            return Utility.isIntersect(o.metas.categories, categories);
        })
    }
    if (tags.length > 0) {
        tempPosts.items = tempPosts.items.filter(o => {
            return Utility.isIntersect(o.metas.tags, tags);
        })
    }
    return tempPosts;
}
