import * as types from './ActionTypes';
import PostResources from "../resources/PostResources";


export function loadPostsSuccess(Posts) {
    return { type: types.LOAD_POSTS_SUCCESS, Posts };
}


export function clearPostsSuccess() {
    return { type: types.CLEAR_POSTS_SUCCESS };
}

export function loadPosts(page,path) {
    let resources = new PostResources();
    return function (dispatch) {
        return resources.getAll(page,path).then(Posts => {
            if (Posts != null && Posts !== undefined) {
                dispatch(loadPostsSuccess(Posts));
            }
        })
    }
}

export function clearPosts() {
    return function (dispatch) {
        dispatch(clearPostsSuccess())
    }
}