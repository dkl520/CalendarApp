import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Chip,
  Paper,
  Tooltip,
  alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit'; // 导入编辑图标

import { Task } from './styles/types';

interface FormAccordionListProps {
  items: Task[];
  onChangeForm: (items: Task[]) => void;
  onComplete: (taskId: string | number) => void;
  onDelete: (taskId: string | number) => void;
  onEdit: (task: Task) => void; // 添加编辑功能的回调
}

const FormAccordionList: React.FC<FormAccordionListProps> = ({ items, onComplete, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | number | null>(null);

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString() + ' ' + new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  const isOverdue = (dateStr: string) => {
    try {
      const dueDate = new Date(dateStr);
      return dueDate < new Date() && !isNaN(dueDate.getTime());
    } catch {
      return false;
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, taskId: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete);
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleEditClick = (e: React.MouseEvent, task: Task) => {

    e.preventDefault();
    e.stopPropagation();
    onEdit(task); // 调用编辑回调
  };

  return (
    <div>
      {items.length === 0 ? (
        <Paper elevation={0} sx={{
          my: 3,
          py: 4,
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2
        }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            No tasks yet. Add a new task to start planning your day.
          </Typography>
        </Paper>
      ) : (
        items.map((item) => {
          const overdue = !item.completed && isOverdue(item.dueDate);

          return (
            <Accordion
              key={item.taskId}
              expanded={expanded === `panel-${item.taskId}`}
              onChange={handleAccordionChange(`panel-${item.taskId}`)}
              sx={{
                mb: 1.5,
                backgroundColor: item.completed
                  ? 'rgba(76, 175, 80, 0.04)'
                  : overdue
                    ? 'rgba(239, 83, 80, 0.04)'
                    : 'white',
                borderRadius: '8px !important',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: item.completed
                  ? '1px solid rgba(76, 175, 80, 0.2)'
                  : overdue
                    ? '1px solid rgba(239, 83, 80, 0.2)'
                    : '1px solid rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${item.taskId}-content`}
                id={`panel-${item.taskId}-header`}
                sx={{
                  padding: '4px 16px',
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 2, overflow: 'hidden' }}>
                    <Tooltip title={item.completed ? "Mark as incomplete" : "Mark as complete"}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.taskId) onComplete(item.taskId);
                        }}
                        sx={{
                          backgroundColor: item.completed ? alpha('#4caf50', 0.1) : 'transparent',
                          '&:hover': {
                            backgroundColor: item.completed ? alpha('#4caf50', 0.2) : alpha('#000', 0.04),
                          }
                        }}
                      >
                        <CheckCircleIcon color={item.completed ? "success" : "action"} />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      sx={{
                        ml: 1.5,
                        fontWeight: item.completed ? 400 : 500,
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'text.secondary' : overdue ? 'error.main' : 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.taskName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <Chip
                      size="small"
                      icon={<AccessTimeIcon fontSize="small" />}
                      label={formatDate(item.dueDate)}
                      variant="outlined"
                      color={overdue ? "error" : "default"}
                      sx={{
                        mr: 2,
                        fontWeight: 400,
                        fontSize: '0.75rem'
                      }}
                    />
                    {/* 添加编辑按钮 */}
                    <Tooltip title="Edit task">
                      <IconButton
                        size="small"
                        onClick={(e) => handleEditClick(e, item)}
                        sx={{
                          mr: 1,
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: alpha('#1976d2', 0.1),
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete task">
                      <IconButton
                        size="small"
                        onClick={(e) => handleDeleteClick(e, item.taskId!)}
                        sx={{
                          '&:hover': {
                            color: 'error.main',
                            backgroundColor: alpha('#f44336', 0.1),
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{
                backgroundColor: alpha('#f5f5f5', 0.5),
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                padding: '16px 24px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'start' }}>
                  <DescriptionIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.3, fontSize: '1rem' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {item.taskDescription || 'No task description provided.'}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 500, pb: 1 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: 1.5,
              textTransform: 'none',
              px: 2
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 1.5,
              textTransform: 'none',
              px: 2,
              boxShadow: '0 2px 6px rgba(244, 67, 54, 0.2)'
            }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormAccordionList;