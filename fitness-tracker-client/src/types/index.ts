export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface Activity {
    id: number;
    type: string;
    duration: string;
    date: string;
  }
  
  export interface Friend {
    id: number;
    name: string;
    activities: Activity[];
  }