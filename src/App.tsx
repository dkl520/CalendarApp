// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timer from './Timer';  // 引入你的 Timer 组件
import Clander from './clander';  // 引入主页组件
import TodoList from './TodoList';  // 引入主页组件
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clander" element={<Clander />} />
        <Route path="/timer" element={<Timer />} />  {/* 跳转到 Timer 页面 */}
        <Route path="/todolist" element={<TodoList />} />  {/* 跳转到 Timer 页面 */}
        <Route path="/" element={<Clander />} />  {/* 跳转到 Timer 页面 */}
      </Routes>
    </Router>
  );
};

export default App;
