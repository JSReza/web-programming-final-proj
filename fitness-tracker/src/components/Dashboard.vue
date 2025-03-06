
<template>
    <div class="section" v-if="currentUser">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <div class="box">
                        <h3 class="title is-4">{{ currentUser.name }}</h3>
                    </div>
                </div>

                <ActivitySection :activities="activityList" @add="addActivity" @delete="deleteActivity"/>

                <FriendsSection :friends="friendList" @add="addFriend" @delete="deleteFriend"/>

                <AdminPanel v-if="isAdmin" :users="userList" @add="addUser" @edit-user="editUser" @delete="deleteUser"/>

            </div>
        </div>
    </div>
</template>
<script setup lang = "ts">
        import {computed, ref} from 'vue'
        import type{User, Activity, Friend} from '../types'
        import FriendsSection from '../components/FriendsSection.vue'
       
        

        const currentUser = ref<User>({
            id: 1,
            name: 'Kendrick Lamar',
            role: 'admin'
        })

        const activityList = ref<Activity[]>([
            {id: 1, type: 'performing at the super bowl', duration: 13, date: '2-13-25'}
        ])
        const friendList = ref<Friend[]>([
            {id: 1, name: 'Snoop Dogg', activities: [{id: 1, type: 'gardening', duration: 20, date: '2-13-25'}]}
        ])

const userList = ref<User[]>([
    {id: 1, name: 'Kendrick Lamar', role: 'admin'},
    {id: 2, name: 'Snoop Dogg', role: 'user'}, 
    {id: 3, name: 'SZA', role: 'user'}
])

const isAdmin = computed(() => currentUser.value.role === 'admin')

const addActivity = (activity: Activity) => {
    activityList.value.push(activity)
}
const deleteActivity = (activity: Activity) => {
    const index = activityList.value.findIndex(a => a.id === activity.id)
    activityList.value.splice(index, 1)
}

const addFriend = (friend: Friend) =>{
    friendList.value.push(friend)
}
const deleteFriend = (friend: Friend) =>{
    const index = friendList.value.findIndex(a => a.id ===friend.id)
    friendList.value.splice(index, 1)
}
const addUser = (user: User) => {
    userList.value.push(user)
}
const editUser = (user: User) => {
    const index = userList.value .findIndex(a=>a.id===user.id)
    if(index !== 0){
        userList.value[index] = user
    }
}
const deleteUser = (user: User) => {
    const index = userList.value.findIndex(a=>a.id === user.id)
    userList.value.splice(index, 1)

}

</script>