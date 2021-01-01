import { setHomeFeed } from "../redux/reducers/homeFeedSlice";
import { setMyAssets } from "../redux/reducers/myAssetsSlice";
import { setSavedPosts } from "../redux/reducers/savedPostsSlice";
import { setUserProfileData } from "../redux/reducers/userProfileDataSlice";
import { store } from "../redux/store";
import { AppLogger } from "../utils/AppHelperMethods";

const UpdatePostIsSaveCheck = (postID) => {

}

const UpdatePostIsLikedCheck = (postID) => {

}


const UpdatePostFromReduxStore = (newPostObject) => {
    /*-----------UPDATE USER PROFILE TABS DATA START-------------*/
    let tempuserProfileData = { ...store.getState().root.userProfileData };

    let newPosts = [...tempuserProfileData.posts.slice()]
    let newMedia = [...tempuserProfileData.media.slice()]
    let newReviews = [...tempuserProfileData.reviews.slice()]
    let newUsers = [...tempuserProfileData.users.slice()]

    let tempuserProfileDataPostsIndex = newPosts?.findIndex(ii => ii?._id === newPostObject?._id)
    let tempuserProfileDataMediaIndex = newMedia?.findIndex(ii => ii?._id === newPostObject?._id)
    let tempuserProfileDataReviewsIndex = newReviews?.findIndex(ii => ii?._id === newPostObject?._id)
    let tempuserProfileDataUsersIndex = newUsers?.findIndex(ii => ii?._id === newPostObject?._id)

    if (tempuserProfileDataPostsIndex > -1) {
        newPosts[tempuserProfileDataPostsIndex] = { ...newPostObject }
        tempuserProfileData = { ...tempuserProfileData, posts: newPosts }
    }

    if (tempuserProfileDataMediaIndex > -1) {
        newMedia[tempuserProfileDataMediaIndex] = { ...newPostObject }
        tempuserProfileData = { ...tempuserProfileData, media: newMedia }
    }

    if (tempuserProfileDataReviewsIndex > -1) {
        newReviews[tempuserProfileDataReviewsIndex] = { ...newPostObject }
        tempuserProfileData = { ...tempuserProfileData, reviews: newReviews }
    }

    if (tempuserProfileDataUsersIndex > -1) {
        newUsers[tempuserProfileDataUsersIndex] = { ...newPostObject }
        tempuserProfileData = { ...tempuserProfileData, users: newUsers }
    }

    /*-----------UPDATE USER PROFILE TABS DATA END-------------*/

    /*
    ***
    ***
    ***
    ***
    */

    /*-----------HOME FEED AND SAVED POSTS TABS DATA START-------------*/

    var tempHomeFeeds = [...store.getState().root.homeFeed];
    var tempSavedPosts = [...store.getState().root.savedPosts];

    // home feed and saved posts
    let foundIndexHomeFeed = tempHomeFeeds.findIndex(ii => ii?._id === newPostObject?._id)
    let foundIndexSavedPosts = tempSavedPosts.findIndex(ii => ii?._id === newPostObject?._id)

    // -- home feed and saved posts
    if (foundIndexHomeFeed > -1)
        tempHomeFeeds[foundIndexHomeFeed] = { ...newPostObject }

    if (foundIndexSavedPosts > -1)
        tempSavedPosts[foundIndexSavedPosts] = { ...newPostObject }

    /*-----------HOME FEED AND SAVED POSTS TABS DATA END-------------*/

    /*
    ***
    ***
    ***
    ***
    ***
    */


    store.dispatch(setUserProfileData(tempuserProfileData));
    store.dispatch(setHomeFeed(tempHomeFeeds));
    store.dispatch(setSavedPosts(tempSavedPosts));
}



const AddPostToReduxStore = (newPost) => {
    let tempHomeFeeds = [...store.getState().root.homeFeed];
    tempHomeFeeds = [newPost, ...tempHomeFeeds]

    store.dispatch(setHomeFeed(tempHomeFeeds));
}


const RemovePostFromReduxStore = (postID) => {
    const tempHomeFeeds = [...store.getState().root.homeFeed];
    const tempSavedPosts = [...store.getState().root.savedPosts];

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii?._id !== postID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii?._id !== postID)));
}

const RemovePostsOfUserFromReduxStore = (userID) => {
    const tempHomeFeeds = [...store.getState().root.homeFeed];
    const tempSavedPosts = [...store.getState().root.savedPosts];

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii?.createdBy?._id !== userID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii?.createdBy?._id !== userID)));
}



const AddAssetBackground = (newBackground) => {
    let tempBackgrounds = { ...store.getState().root.myAssets };
    tempBackgrounds.backgrounds = [newBackground, ...tempBackgrounds.backgrounds]

    store.dispatch(setMyAssets(tempBackgrounds));
}

const AddAssetNickname = (newNickname) => {
    let tempNicknames = { ...store.getState().root.myAssets };
    tempNicknames.nicknames = [newNickname, ...tempNicknames.nicknames]

    store.dispatch(setMyAssets(tempNicknames));
}

const AddAssetCorner = (newCorner) => {
    let tempCorners = { ...store.getState().root.myAssets };
    tempCorners.corners = [newCorner, ...tempCorners.corners];

    store.dispatch(setMyAssets(tempCorners));
}


export { AddAssetBackground, AddAssetCorner, AddAssetNickname, UpdatePostIsLikedCheck, AddPostToReduxStore, UpdatePostIsSaveCheck, RemovePostFromReduxStore, UpdatePostFromReduxStore, RemovePostsOfUserFromReduxStore }