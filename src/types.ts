// Interface principal de TypeScript para una tarea
export interface Task {
  id: number
  title: string
  priority: 'Alta' | 'Media' | 'Baja'
  completed: boolean
}
