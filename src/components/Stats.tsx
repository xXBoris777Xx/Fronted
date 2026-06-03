import { Card, Col, Progress, Row, Statistic, Tag, Typography } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Task } from '../types'

const { Title } = Typography

interface Props { tasks: Task[] }

export default function Stats({ tasks }: Props) {
  // Cálculos de estadísticas
  const total     = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending   = total - completed
  const pct       = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 16px' }}>
      <Title level={2}>📊 Estadísticas</Title>

      {/* Statistic de Ant Design */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total de tareas"
              value={total}
              prefix={<UnorderedListOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#6366f1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Completadas"
              value={completed}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Pendientes"
              value={pending}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress de Ant Design */}
      <Card style={{ marginTop: 16, borderRadius: 12 }}>
        <Title level={5}>Progreso general</Title>
        <Progress
          percent={pct}
          strokeColor={{ '0%': '#6366f1', '100%': '#52c41a' }}
          status={pct === 100 ? 'success' : 'active'}
        />
      </Card>

      {/* Por prioridad con Tag */}
      <Card style={{ marginTop: 16, borderRadius: 12 }}>
        <Title level={5}>Por prioridad</Title>
        <Row gutter={[16, 16]}>
          {(['Alta', 'Media', 'Baja'] as Task['priority'][]).map(p => (
            <Col xs={24} sm={8} key={p}>
              <Statistic
                title={<Tag color={p === 'Alta' ? 'red' : p === 'Media' ? 'orange' : 'green'}>{p}</Tag>}
                value={tasks.filter(t => t.priority === p).length}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  )
}
