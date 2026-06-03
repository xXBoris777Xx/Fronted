import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// Convierte prioridad de español a inglés para el backend
function traducirPrioridad(priority: string): string {
  const mapa: Record<string, string> = {
    'Alta': 'high',
    'Media': 'medium',
    'Baja': 'low',
  }
  return mapa[priority] ?? priority
}

// Convierte prioridad de inglés a español para mostrar en pantalla
function traducirPrioridadDeVuelta(priority: string): string {
  const mapa: Record<string, string> = {
    'high': 'Alta',
    'medium': 'Media',
    'low': 'Baja',
  }
  return mapa[priority] ?? priority
}

function adaptarTarea(tarea: any) {
  return { ...tarea, priority: traducirPrioridadDeVuelta(tarea.priority) }
}

export function getTasks() {
  return api.get('/tasks').then(res => res.data.map(adaptarTarea))
}

export function createTask(task: { title: string; priority: string }) {
  return api.post('/tasks', {
    title: task.title,
    priority: traducirPrioridad(task.priority),
  }).then(res => adaptarTarea(res.data))
}

export function toggleTask(id: number, completed: boolean) {
  return api.patch(`/tasks/${id}`, { completed }).then(res => adaptarTarea(res.data))
}

export function deleteTask(id: number) {
  return api.delete(`/tasks/${id}`).then(res => res.data)
}