export interface User{
    id: number;
    name: string;
    role: 'user'|'admin';
}
export interface Activity{
    id: number;
    type: string;
    duration: number;
    date: string;
}
export interface Friend{
    id: number;
    name: string;
    activities: Activity[];
}