import { Button, Tag, Tooltip } from 'antd'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const priorityColor: Record<Task['priority'], string> = {
  Alta:  'red',
  Media: 'orange',
  Baja:  'green',
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', background: '#fff', borderRadius: 10,
      boxShadow: '0 1px 4px #0001',
      opacity: task.completed ? 0.6 : 1,
      transition: 'opacity .2s',
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Botón completar — onClick */}
        <Tooltip title={task.completed ? 'Desmarcar' : 'Completar'}>
          <Button
            shape="circle"
            type={task.completed ? 'primary' : 'default'}
            icon={<CheckOutlined />}
            onClick={() => onToggle(task.id)}
            style={{ background: task.completed ? '#52c41a' : undefined,
                     borderColor: task.completed ? '#52c41a' : undefined }}
          />
        </Tooltip>

        <div>
          {/* Título con tachado condicional */}
          <span style={{
            fontSize: 15, fontWeight: 500,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#aaa' : '#1e293b',
          }}>
            {task.title}
          </span>

          {/* Tag de Ant Design para la prioridad */}
          <div style={{ marginTop: 4 }}>
            <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
            {task.completed && <Tag color="default">Completada ✓</Tag>}
          </div>
        </div>
      </div>

      {/* Botón eliminar — onClick */}
      <Tooltip title="Eliminar">
        <Button
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(task.id)}
        />
      </Tooltip>
    </div>
  )
}
