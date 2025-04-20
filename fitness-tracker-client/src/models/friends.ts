import {ref} from 'vue'
import type {Activity} from './activity'
export interface Friend {
    id: number
    name: string
    activities: Activity[]
}
const friends = ref<Friend[]>([])
export function addFriend(friend: Friend) {
    friends.value.push(friend)
}