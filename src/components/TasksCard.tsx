import { useTask } from '../context/TasksContext'

interface Data {
  id: number
  title: string
  description: string
  isActive: boolean
}

const TasksCard = ({ data }: { data: Data }) => {
  const date = Date.now()
  const actualDate = new Date(date).toLocaleDateString()

  const { deleteTask, crossTask, activeTask, getId, getData } = useTask()

  const handleActived = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    if(data.isActive){
      crossTask(data.id)
    }else{
      activeTask(data.id)
    }
  }

  const handleUpdate = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    getId(data.id)
    getData({task: data.title, description: data.description})
  }

  const handleDelete = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    deleteTask(data.id)
  }

  return (
    <div
      className={
        data.isActive
          ? 'w-full max-w-md min-h-[200px] flex flex-col bg-slate-900 text-white p-4 rounded-md'
          : 'w-full max-w-md min-h-[200px] flex flex-col bg-black/10 text-white/10 p-4 rounded-md'
      }
    >
      <div className="flex flex-col gap-2 h-full" onClick={handleActived}>
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <p className="text-md">{data.description}</p>
      </div>
      <div className="flex justify-between items-center gap-2 mt-4 font-bold">
        <button
          className={
            data.isActive ? 'w-[90%] bg-blue-950 rounded-md py-2' : 'w-[90%] bg-blue-950 rounded-md py-2 text-white/70'
          }
          disabled={data.isActive ? false : true}
          onClick={handleUpdate}
        >
          {data.isActive ? 'Editar' : 'Tarea'}
        </button>
        <button
          className={
            data.isActive ? 'w-[90%] bg-red-950 rounded-md py-2' : 'w-[90%] bg-red-950 rounded-md py-2 text-white/70'
          }
          disabled={data.isActive ? false : true}
          onClick={handleDelete}
        >
          {data.isActive ? 'Eliminar' : 'Finalizada'}
        </button>
      </div>
      <div className="mt-4">
        <hr className="border-white/20" />
        <p className="text-white/20">Agregado el {actualDate}</p>
      </div>
    </div>
  )
}

export default TasksCard
