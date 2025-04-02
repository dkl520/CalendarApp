import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import FormAccordionList from './FormAccordionList'; // Import the FormAccordionList component
import { v4 as uuidv4 } from 'uuid'; // Install uuid package if needed: npm install uuid @types/uuid

// Define the form data interface (same as in the component)
interface FormData {
  id: string;
  title: string;
  time: string; // Store date-time as a string
  description: string;
  frequency: string;
}

const TodoList: React.FC = () => {
  // Initial form data
  const [formItems, setFormItems] = useState<FormData[]>([
    {
      id: uuidv4(),
      title: 'Daily Standup',
      time: '2023-04-01T09:00', // ISO format date-time string
      description: 'Daily team progress update',
      frequency: 'daily'
    },
    {
      id: uuidv4(),
      title: 'Project Weekly Report',
      time: '2023-04-07T15:00',
      description: 'Weekly project summary',
      frequency: 'weekly'
    }
  ]);

  // Handle form data changes
  const handleFormChange = (updatedItems: FormData[]) => {
    setFormItems(updatedItems);
    console.log('Updated form data:', updatedItems);
  };

  // Add a new form item
  const handleAddItem = () => {
    // Generate the current ISO time string (YYYY-MM-DDThh:mm format)
    const now = new Date();
    // const timeStr = now.toISOString().slice(0, 16);

    const newItem: FormData = {
      id: uuidv4(),
      title: '',
      // time: timeStr,
      time: "",
      description: '',
      frequency: 'daily'
    };
    setFormItems([...formItems, newItem]);
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
            onClick={handleAddItem}
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default TodoList;