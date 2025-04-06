// types.ts
export interface UserTask {
    id: number;
  }
  
  export interface Task {
    taskId?: string | number;
    taskName: string;
    dueDate: string;
    user: UserTask;
    taskDescription: string;
    completed: boolean;
  }
  
  export interface User {
    id: number;
    role: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    username: string;
  }
  