import {ref} from 'vue';
import {Activity} from './activity.ts';
import {api} from './session.ts';

export interface Exercise {
    activity: Activity
}
const exercises = ref<Exercise[]>([])

export function refExercises() {
    return exercises
}
export function addExercise(exercise: Exercise) {
    exercises.value.push(exercise)
}

