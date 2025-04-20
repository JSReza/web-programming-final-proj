const info = require('.data/friends.json');
const {CustomError,statusCodes} = require('./error.js');
async function getFriends() {
    return info;
}
async function getFriend(id) {
    const friend = info.find((friend) => friend.id === id);
    if (!friend) {
        throw new CustomError('Friend not found', statusCodes.NOT_FOUND);
    }
    return friend;
}
async function createFriend(friend) {
    const newFriend = {
        id: info.length + 1,
        ...friend
    };
    info.push(newFriend);
    return newFriend;
}
async function updateFriend(id, friend) {   
    const index = info.findIndex((friend) => friend.id === id);
    if (index === -1) {
        throw new CustomError('Friend not found', statusCodes.NOT_FOUND);

    }
    info[index] = { ...info[index], ...friend };
    return info[index];
}
async function deleteFriend(id) {
    const index = info.findIndex((friend) => friend.id === id);
    if (index === -1) {
        throw new CustomError('Friend not found', statusCodes.NOT_FOUND);
    }
    const deletedFriend = info[index];
    info.splice(index, 1);
    return deletedFriend;
}
module.exports = {
    getFriends,
    getFriend,
    createFriend,
    updateFriend,
    deleteFriend
};