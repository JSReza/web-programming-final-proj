const info = require('./data/activity.json');
const {CustomError,statusCodes} = require('./error.js');
async function getActivities() {
    return info;
}
async function getActivity(id) {
    const activity = info.find((activity) => activity.id === id);
    if (!activity) {
        throw new CustomError('Activity not found', statusCodes.NOT_FOUND);
    }
    return activity;
}
async function createActivity(activity) {
    const newActivity = {
        id: info.length + 1,
        ...activity
    };
    info.push(newActivity);
    return newActivity;
}
async function updateActivity(id, activity) {   
    const index = info.findIndex((activity) => activity.id === id);
    if (index === -1) {
        throw new CustomError('Activity not found', statusCodes.NOT_FOUND);
    }
    info[index] = { ...info[index], ...activity };
    return info[index];
}
async function deleteActivity(id) {
    const index = info.findIndex((activity) => activity.id === id);
    if (index === -1) {
        throw new CustomError('Activity not found', statusCodes.NOT_FOUND);
    }
    const deletedActivity = info[index];
    info.splice(index, 1);
    return deletedActivity;
}