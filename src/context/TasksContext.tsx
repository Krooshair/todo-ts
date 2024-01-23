import { createContext, ReactNode, useContext, useState } from "react"

interface MyTask{
  id: number,
  task: string,
  description: string,
  isActive: boolean,
}

type ToForm = Omit<MyTask, 'id' | 'isActive'>

interface MyPropsContext {
  tasks: MyTask[]
  selectId: number
  selectTask: string
  selectDesc: string
  createTasks: (task: ToForm) => void
  updateTask: (id: number, task: ToForm) => void
  deleteTask: (id: number) => void
  crossTask: (id: number) => void
  activeTask: (id: number) => void
  getId: (id: number) => void
  getData: (task: ToForm) => void
}

const TaskContext = createContext<MyPropsContext | undefined>(undefined)

export const useTask = () => {
  const context = useContext(TaskContext)
  if(!context) throw new Error('useTask debe usarse dentro de un TaskProvider')
  return context
}

export const TaskProvider: React.FC<MyPropsContext & {children: ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<MyTask[]>([])
  const [selectId, setSelectId] = useState<number>(0)
  const [selectTask, setSelectTask] = useState<string>('')
  const [selectDesc, setSelectDesc] = useState<string>('')

  const createTasks = ({task, description}: ToForm): void => {
    setTasks(tareas => {
      const newTask = [
        ...tareas,
        {
          id: tareas.length + 1,
          task,
          description,
          isActive: true
        },
      ]

      return newTask
    })
  }

  const updateTask = (id: number, {task, description}: ToForm): void => {
    setTasks(tareas => {
      return tareas.map(tarea => {
        if(tarea.id === id){
          return {...tarea, task, description}
        }else{
          return tarea
        }
      })
    })
  }

  const getId = (id: number): void => {
    setSelectId(id)
  }

  const getData = ({task, description}: ToForm): void => {
    setSelectTask(task)
    setSelectDesc(description)
  }

  const deleteTask = (id: number): void => {
    setTasks(tareas => {
      const deletedTask = tareas.filter(tarea => tarea.id !== id)
      return deletedTask
    })
  }

  const crossTask = (id: number): void => {
    setTasks(tareas => {
      return tareas.map(tarea => tarea.id === id ? {...tarea, isActive: false} : tarea)
    })
  }

  const activeTask = (id: number): void => {
    setTasks(tareas => {
      return tareas.map(tarea => (tarea.id === id ? { ...tarea, isActive: true } : tarea))
    })
  }

  return <TaskContext.Provider value={{ tasks, createTasks, updateTask, deleteTask, crossTask, activeTask, selectId, getId, selectTask, selectDesc, getData }}>{children}</TaskContext.Provider>
}
