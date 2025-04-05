import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import FormAccordionList from './FormAccordionList'; // Import the FormAccordionList component
import { v4 as uuidv4 } from 'uuid'; // Install uuid package if needed: npm install uuid @types/uuid

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


// Define the form data interface (same as in the component)
interface FormData {
  id: string;
  taskName: string;
  dueDate: string; // Store date-time as a string
  taskDescription: string;
  completed: boolean;
  // frequency: string;
}


const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

const TodoList: React.FC = () => {
  // Initial form data
  const [formItems, setFormItems] = useState<FormData[]>([
    {
      id: uuidv4(),
      taskName: 'Daily Standup',
      dueDate: '2023-04-01T09:00', // ISO format date-time string
      taskDescription: 'Daily team progress update',
      completed: false,
      // frequency: 'daily'
    },
    {
      id: uuidv4(),
      taskName: 'Daily Standup',
      dueDate: '2023-04-01T09:00', // ISO format date-time string
      taskDescription: 'Daily team progress update',
      completed: false,
      // frequency: 'daily'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  // const [formItems, setFormItems] = useState<FormData[]>([]);
  const [newItem, setNewItem] = useState<FormData>({
    id: crypto.randomUUID(),
    taskName: '',
    dueDate: '',
    // userId
    taskDescription: '',
    completed: false,
    // frequency: 'daily'
  });


  const handleSave = () => {
    setFormItems([...formItems, newItem]);
    setIsOpen(false);
    setNewItem({
      id: crypto.randomUUID(),
      taskName: '',
      dueDate: '',
      // userId
      taskDescription: '',
      completed: false,
      // frequency: 'daily'
    });
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewItem({ ...newItem, [field]: e.target.value });
  };

  // Handle form data changes
  const handleFormChange = (updatedItems: FormData[]) => {
    setFormItems(updatedItems);
    console.log('Updated form data:', updatedItems);
  };



  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100'>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Task Management
          </Typography>

          <FormAccordionList
            items={formItems}
            onChange={handleFormChange}
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
            <label className="block text-sm font-medium text-gray-700">taskName</label>
            <input
              type="text"
              value={newItem.taskName}
              onChange={handleChange('taskName')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">dueDate</label>
            <input
              type="datetime-local"
              value={newItem.dueDate}
              onChange={handleChange('dueDate')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">taskDescription</label>
            <textarea
              value={newItem.taskDescription}
              onChange={handleChange('taskDescription')}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              value={newItem.frequency}
              onChange={handleChange('frequency')}
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