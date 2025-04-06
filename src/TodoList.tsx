import { useState, useEffect } from 'react';
import { taskService } from './services/taskService';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Task {
  id?: number;
  taskName: string;
  dueDate: string;
  userId: number;
  taskDescription: string;
  completed: boolean;
}


const TodoList2 = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState<Task>({
    taskName: '',
    dueDate: new Date().toISOString(),
    userId: 1, // 这里需要替换为实际的用户ID
    taskDescription: '',
    completed: false
  });

  const fetchTasks = async () => {
    try {
      const userId = 19; // 这里需要替换为实际的用户ID
      const response = await taskService.getUserTasks(userId);
      setTasks(response.data);
    } catch (error) {
      setError('获取任务失败');
      console.error('获取任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    try {
      await taskService.createTask(newTask);
      setNewTask({
        taskName: '',
        dueDate: new Date().toISOString(),
        userId: 1,
        taskDescription: '',
        completed: false
      });
      fetchTasks();
    } catch (error) {
      setError('添加任务失败');
      console.error('添加任务失败:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    debugger
    try {
      await taskService.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      setError('删除任务失败');
      console.error('删除任务失败:', error);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    debugger
    try {
      await taskService.completeTask(taskId);
      fetchTasks();
    } catch (error) {
      setError('更新任务状态失败');
      console.error('更新任务状态失败:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          label="任务名称"
          value={newTask.taskName}
          onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="任务描述"
          value={newTask.taskDescription}
          onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="截止日期"
            value={new Date(newTask.dueDate)}
            onChange={(date) => date && setNewTask({ ...newTask, dueDate: date.toISOString() })}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          添加任务
        </Button>
      </Paper>

      {loading && <div>加载中...</div>}
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              bgcolor: task.completed ? 'action.hover' : 'background.paper',
              marginBottom: 1,
              borderRadius: 1
            }}
          >
            <ListItemText
              primary={task.taskName}
              secondary={`${task.taskDescription} - 截止日期: ${new Date(task.dueDate).toLocaleDateString()}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => task.id && handleCompleteTask(task.id)}
                sx={{ marginRight: 1 }}
              >
                <CheckCircleIcon color={task.completed ? "success" : "action"} />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => task.id && handleDeleteTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList2;