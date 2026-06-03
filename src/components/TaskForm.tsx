import { useState } from 'react'
import { Button, Card, Input, Select, Space, Typography } from 'antd'
import type { ChangeEvent } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Task } from '../types'

const { Title } = Typography

interface Props {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle]       = useState<string>('')
  const [priority, setPriority] = useState<Task['priority']>('Alta')

  function handleSubmit(): void {
    if (!title.trim()) return
    onAdd({ title: title.trim(), priority })
    setTitle('')
    setPriority('Alta')
  }

  return (
    <Card style={{ marginBottom: 24, borderRadius: 12 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Agregar tarea</Title>

      <Space.Compact style={{ width: '100%', gap: 8, flexWrap: 'wrap', display: 'flex' }}>

        {/* Input de Ant Design — evento onChange */}
        <Input
          style={{ flex: 1, minWidth: 180 }}
          placeholder="Nombre de la tarea…"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          onPressEnter={handleSubmit}
          size="large"
        />

        {/* Select de Ant Design — evento onChange */}
        <Select<Task['priority']>
          value={priority}
          onChange={(val: Task['priority']) => setPriority(val)}
          size="large"
          style={{ width: 120 }}
          options={[
            { value: 'Alta',  label: '🔴 Alta'  },
            { value: 'Media', label: '🟡 Media' },
            { value: 'Baja',  label: '🟢 Baja'  },
          ]}
        />

        {/* Button de Ant Design */}
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleSubmit}
        >
          Agregar tarea
        </Button>

      </Space.Compact>
    </Card>
  )
}
