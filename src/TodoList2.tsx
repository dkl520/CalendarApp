import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import FormAccordionList from './FormAccordionList';
import { taskService } from './services/taskService';
import { v4 as uuidv4 } from 'uuid';

const Dialog = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
};

// 定义Task接口
interface Task {
  taskId?: string | number;
  taskName: string;
  dueDate: string;
  userId: number;
  taskDescription: string;
  completed: boolean;
}
interface User {
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
const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [newTask, setNewTask] = useState<Task>({
    taskName: '',
    dueDate: new Date().toISOString(),
    userId: -1,  // 这里需要替换为实际的用户ID
    taskDescription: '',
    completed: false
  });

  // 获取任务列表

  // 这里需要替换为实际的用户ID
  const fetchTasks = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('User ID is not available.');
      }
      const response = await taskService.getUserTasks(user.id);
      setTasks(response.data);
    } catch (error) {
      setError('获取任务失败');
      console.error('获取任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 添加新任务
  const handleSave = async () => {
    debugger
    try {

      await taskService.createTask(newTask);
      setIsOpen(false);
      // setNewTask({
      //   taskName: '',
      //   dueDate: new Date().toISOString(),
      //   userId: user.id,
      //   taskDescription: '',
      //   completed: false
      // });
      fetchTasks();
    } catch (error) {
      setError('添加任务失败');
      console.error('添加任务失败:', error);
    }
  };

  // 删除任务
  const handleDeleteTask = async (taskId: string | number) => {
    debugger
    try {
      await taskService.deleteTask(Number(taskId));
      fetchTasks();
    } catch (error) {
      setError('删除任务失败');
      console.error('删除任务失败:', error);
    }
  };

  // 完成任务
  const handleCompleteTask = async (taskId: string | number) => {
    try {
      await taskService.completeTask(Number(taskId));
      fetchTasks();
    } catch (error) {
      setError('更新任务状态失败');
      console.error('更新任务状态失败:', error);
    }
  };

  // 表单变化处理
  const handleChange = (field: keyof Task) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };

  // 处理表单数据变化
  const handleFormChange = (updatedItems: Task[]) => {
    setTasks(updatedItems);
    console.log('Updated form data:', updatedItems);
  };

  // 初始加载

  // 初始加载
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUser(userData);
    if (userData && userData.id) {
      setNewTask(prev => ({ ...prev, userId: userData.id }));
    }
  }, []);
  useEffect(() => {
    if (user && user.id) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100'>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Task Management
          </Typography>

          {loading && <div>加载中...</div>}
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

          <FormAccordionList
            items={tasks}
            onChangeForm={handleFormChange}  // 修改这里，与   // 保留这里的 onChangeForm
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />

          <Button
            color="secondary"
            variant="contained"
            onClick={() => setIsOpen(true)}
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </Box>
      </Container>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Add New Task</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              type="text"
              value={newTask.taskName}
              onChange={handleChange('taskName')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="datetime-local"
              value={newTask.dueDate.substring(0, 16)} // Format for datetime-local input
              onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value).toISOString() })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Task Description</label>
            <textarea
              value={newTask.taskDescription}
              onChange={handleChange('taskDescription')}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              {frequencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TodoList;