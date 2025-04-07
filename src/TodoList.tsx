import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import FormAccordionList from './FormAccordionList';
import { taskService } from './services/taskService';
import { Task, User } from './styles/types';
import ErrorAlert from './ErrorAlert';
import MessageDisplay from './MessageDisplay';

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

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [newTask, setNewTask] = useState<Task>({
    taskName: '',
    dueDate: new Date().toISOString(),
    taskDescription: '',
    user: {
      id: 1
    },
    completed: false
  });

  // Fetch task list
  // Replace with actual user ID if necessary
  const fetchTasks = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('User ID is not available.');
      }
      setLoading(true);
      const response = await taskService.getUserTasks(user.id);
      setLoading(false);
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <MessageDisplay loading={loading} />;
  }


  // Add new task
  const handleSave = async () => {
    debugger;
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
      setError('Failed to add task');
      console.error('Failed to add task:', error);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId: string | number) => {
    try {
      await taskService.deleteTask(Number(taskId));
      fetchTasks();
    } catch (error) {
      setError('Failed to delete task');
      console.error('Failed to delete task:', error);
    }
  };

  // Complete task
  const handleCompleteTask = async (taskId: string | number) => {
    try {
      await taskService.completeTask(Number(taskId));
      fetchTasks();
    } catch (error) {
      setError('Failed to update task status');
      console.error('Failed to update task status:', error);
    }
  };

  // Handle input changes
  const handleChange = (field: keyof Task) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewTask({ ...newTask, [field]: e.target.value });
  };

  // Handle form data change
  const handleFormChange = (updatedItems: Task[]) => {
    setTasks(updatedItems);
    console.log('Updated form data:', updatedItems);
  };

  // Initial load
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUser(userData);
    if (userData && userData.id) {
      setNewTask(prev => ({ ...prev, userId: userData.id }));
    } else {
      setError('User ID is not available.');
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchTasks();
    }
  }, [user]);



  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100">
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom color="secondary">
            Task Management
          </Typography>

          <ErrorAlert
            error={error}
            onClose={() => setError('')}
            duration={3000}
          />
          <FormAccordionList
            items={tasks}
            onChangeForm={handleFormChange}  // Preserve the onChangeForm here
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
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: new Date(e.target.value).toISOString() })
              }
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
