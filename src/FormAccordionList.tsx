import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// 定义接口
interface Task {
  taskId?: string | number;
  taskName: string;
  dueDate: string;
  userId: number;
  taskDescription: string;
  completed: boolean;
}

interface FormAccordionListProps {
  items: Task[];
  onChangeForm: (items: Task[]) => void;  // 修改这里，与 TodoList 中一致
  onComplete: (taskId: string | number) => void;
  onDelete: (taskId: string | number) => void;
}

const FormAccordionList: React.FC<FormAccordionListProps> = ({ items, onChangeForm, onComplete, onDelete }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString() + ' ' + new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <Typography variant="body1" sx={{ my: 2, textAlign: 'center', color: 'text.secondary' }}>
          No tasks available. Add a new task to get started.
        </Typography>
      ) : (
        items.map((item) => (
          <Accordion 
            key={item.taskId} 
            expanded={expanded === `panel-${item.taskId}`}
            onChange={handleAccordionChange(`panel-${item.taskId}`)}
            sx={{ 
              mb: 1,
              backgroundColor: item.completed ? 'rgba(0, 0, 0, 0.04)' : 'white',
              '&:before': { display: 'none' }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${item.taskId}-content`}
              id={`panel-${item.taskId}-header`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.taskId) onComplete(item.taskId);
                    }}
                  >
                    <CheckCircleIcon color={item.completed ? "success" : "action"} />
                  </IconButton>
                  <Typography
                    sx={{
                      ml: 1,
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'text.secondary' : 'text.primary'
                    }}
                  >
                    {item.taskName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {formatDate(item.dueDate)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.preventDefault(); // 阻止默认行为
                      e.stopPropagation();
                      if (item.taskId) onDelete(item.taskId);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item.taskDescription || 'No description provided.'}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default FormAccordionList;