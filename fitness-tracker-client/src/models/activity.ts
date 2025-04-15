import { ref } from 'vue'
export interface Activity {
    id: number
    name: string
    date: string
    duration: number
}
const activities = ref<Activity[]>([])

    export function addActivity(activity: Activity) {
        activities.value.push(activity)
    }