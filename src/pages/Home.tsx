import { useNavigate } from 'react-router-dom'
import { Button, Card, Typography, Space } from 'antd'
import { UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 700, margin: '48px auto', padding: '0 16px' }}>
      <Card style={{ textAlign: 'center', borderRadius: 16 }}>
        <Title level={1} style={{ marginBottom: 8 }}>
          🗂️ Sistema de Gestión de Tareas
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 16, marginBottom: 32 }}>
          Organiza tu día, marca tus logros y mantén el control de tus pendientes.
        </Paragraph>

        <Space size="middle" wrap>
          {/* Botón principal — Ir a Tareas */}
          <Button
            type="primary"
            size="large"
            icon={<UnorderedListOutlined />}
            onClick={() => navigate('/tasks')}
          >
            Ir a Tareas
          </Button>

          {/* Botón secundario — Ir a Estadísticas */}
          <Button
            size="large"
            icon={<BarChartOutlined />}
            onClick={() => navigate('/stats')}
          >
            Ir a Estadísticas
          </Button>
        </Space>
      </Card>
    </div>
  )
}
