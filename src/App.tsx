import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Task } from './types'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TasksPage from './pages/TasksPage'
import Stats from './components/Stats'
import * as taskService from './api/taskService'  // 👈 importar servicios

const { Content } = Layout

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Al abrir la app, carga las tareas del backend
  useEffect(() => {
    taskService.getTasks()
      .then(data => setTasks(data))
      .catch(err => console.error('Error:', err))
  }, [])

  async function addTask(data: Omit<Task, 'id' | 'completed'>) {
    const nueva = await taskService.createTask(data)
    setTasks(prev => [...prev, nueva])
  }

  async function toggleTask(id: number) {
    const tarea = tasks.find(t => t.id === id)!
    const actualizada = await taskService.toggleTask(id, !tarea.completed)
    setTasks(prev => prev.map(t => t.id === id ? actualizada : t))
  }

  async function deleteTask(id: number) {
    await taskService.deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/tasks" element={
            <TasksPage tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
          } />
          <Route path="/stats" element={<Stats tasks={tasks} />} />
        </Routes>
      </Content>
    </Layout>
  )
}