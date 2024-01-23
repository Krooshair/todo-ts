import TasksCard from './TasksCard'
import { useTask } from '../context/TasksContext'

const TasksList = () => {
  const { tasks } = useTask()

  return (
    <div
      className={
        tasks.length > 0
          ? 'w-[90%] min-w-min mx-auto grid grid-cols-1 gap-4 mt-4 py-2 px-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3'
          : 'mt-8'
      }
    >
      {tasks.length > 0 ? (
        tasks.map(tarea => (
          <TasksCard
            key={tarea.id}
            data={{
              id: tarea.id,
              title: tarea.task,
              description: tarea.description,
              isActive: tarea.isActive
            }}
          />
        ))
      ) : (
        <h1 className="text-3xl font-bold text-white/30 text-center">No hay tareas</h1>
      )}
    </div>
  )
}

export default TasksList
