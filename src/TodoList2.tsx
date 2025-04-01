import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import FormAccordionList from './FormAccordionList'; // 导入上面创建的组件
import { v4 as uuidv4 } from 'uuid'; // 需要安装 uuid 包：npm install uuid @types/uuid

// 定义表单数据接口（与组件中相同）
interface FormData {
  id: string;
  title: string;
  time: string; // 使用字符串类型存储日期时间
  description: string;
  frequency: string;
}

const TodoList: React.FC = () => {
  // 初始表单数据
  const [formItems, setFormItems] = useState<FormData[]>([
    {
      id: uuidv4(),
      title: '每日站会',
      time: '2023-04-01T09:00', // ISO 格式的日期时间字符串
      description: '团队每日进度更新',
      frequency: 'daily'
    },
    {
      id: uuidv4(),
      title: '项目周报',
      time: '2023-04-07T15:00',
      description: '项目周进度汇总',
      frequency: 'weekly'
    }
  ]);

  // 处理表单数据变更
  const handleFormChange = (updatedItems: FormData[]) => {
    setFormItems(updatedItems);
    console.log('Updated form data:', updatedItems);
  };

  // 添加新的表单项
  const handleAddItem = () => {
    // 创建当前时间的ISO字符串（YYYY-MM-DDThh:mm格式）
    const now = new Date();
    // const timeStr = now.toISOString().slice(0, 16);
    
    const newItem: FormData = {
      id: uuidv4(),
      title: '',
    //   time: timeStr,
      time: "",
      description: '',
      frequency: 'daily'
    };
    setFormItems([...formItems, newItem]);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          任务管理
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
  );
};

export default TodoList;