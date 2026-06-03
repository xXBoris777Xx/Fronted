import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons'

const { Header } = Layout

export default function Navbar() {
  const location = useLocation()

  const items = [
    { key: '/',      label: <Link to="/">Inicio</Link>,        icon: <HomeOutlined /> },
    { key: '/tasks', label: <Link to="/tasks">Tareas</Link>,   icon: <UnorderedListOutlined /> },
    { key: '/stats', label: <Link to="/stats">Estadísticas</Link>, icon: <BarChartOutlined /> },
  ]

  return (
    <Header style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '0 24px' }}>
      <span style={{ color: '#f8f4f4', fontWeight: 700, fontSize: 20, whiteSpace: 'nowrap' }}>
        ✅ TaskApp
      </span>
      {/* Menu de Ant Design con la ruta activa */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  )
}
