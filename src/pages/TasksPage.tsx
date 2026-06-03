import { Typography } from 'antd'
import { Task } from '../types'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

const { Title, Text } = Typography

interface Props {
  tasks: Task[]
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TasksPage({ tasks, onAdd, onToggle, onDelete }: Props) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 16px' }}>
      <Title level={2}>📋 Mis Tareas</Title>
      <TaskForm onAdd={onAdd} />
      <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
        {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} en total
      </Text>
      <TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
    </div>
  )
}
