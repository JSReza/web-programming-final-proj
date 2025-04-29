const info = require('../data/activity.json').activities;
const {CustomError,statusCodes} = require('./errors.js');
const { connect } = require('./supabase')
async function getActivities() {
    const list = await connect().from('activities').select('*');
    if (list.error) {
        throw new CustomError('Error fetching activities', statusCodes.INTERNAL_SERVER_ERROR);
    }
    return {activities:list.data};
}
async function getActivity(id) {
    const { activity } = await connect().from('activities').select('*').eq('id', id);
    if (!activity) {
        throw new CustomError('Activity not found', statusCodes.NOT_FOUND);
    }
    return activity;
}
async function createActivity(activity) {
   const {data,error} = await connect().from('activities').insert(activity).select('*');
   if (error) {
       throw new CustomError('Error creating activity', statusCodes.INTERNAL_SERVER_ERROR);
   }
    return data[0];
}
async function updateActivity(id, activity) {   
    const {data,error} = await connect().from('activities').update(activity).eq('id',id.select('*'));
    if(error){
        throw new CustomError('Error updating activity', statusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteActivity(id) {
   const{data,error} = await connect().from('activities').delete().eq('id',id).select('*');
    if (error) {
         throw new CustomError('Error deleting activity', statusCodes.INTERNAL_SERVER_ERROR);
    }

}
async function seed(){
    for(const activity of info){

        const insert = mapToDB(activity);
        const {data,error} = await connect().from('activities').insert(insert).select('*');
        if (error) {
            throw new CustomError('Error seeding activities', statusCodes.INTERNAL_SERVER_ERROR);
        }
        console.log('Inserted activity:', data[0]);
    }
}
function mapToDB(activity) {
    return {
        id: activity.id,
        type: activity.type,
        duration: activity.duration,
        date: activity.date,
        created_at: activity.created_at,
        updated_at: activity.updated_at
    };
}
module.exports = {
    getActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    seed
};
