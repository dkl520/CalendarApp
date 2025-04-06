import axiosInstance from './axiosConfig';

import { Task } from '../styles/types';

export const taskService = {
  // 获取单个任务详情
  getTask: async (taskId: number) => {
    return axiosInstance.get<Task>(`/tasks/${taskId}`);
  },

  // 更新任务
  updateTask: async (taskId: number, taskData: Task) => {
    return axiosInstance.put<Record<string, never>>(`/tasks/${taskId}`, taskData);
  },

  // 删除任务
  deleteTask: async (taskId: number) => {
    return axiosInstance.delete(`/tasks/${taskId}`);
  },

  // 创建新任务
  createTask: async (taskData: Task) => {
    return axiosInstance.post<Record<string, never>>('/tasks', taskData);
  },

  // 完成任务
  completeTask: async (taskId: number) => {
    return axiosInstance.post<Record<string, never>>(`/tasks/${taskId}/complete`);
  },

  // 获取用户的所有任务
  getUserTasks: async (userId: number) => {
    return axiosInstance.get<Task[]>(`/tasks/${userId}/user`);
  }
};