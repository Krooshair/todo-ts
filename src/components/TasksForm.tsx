import { useTask } from "../context/TasksContext"
import { useState } from "react"

const TasksForm = () => {

  const [valueInput, setValueInput] = useState<string>('')
  const [valueTextArea, setValueTextArea] = useState<string>('')

  const {createTasks, updateTask ,selectId, getId, selectTask, selectDesc} = useTask()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const task = formData.get('task') as string | null
    const description = formData.get('description') as string | null

    if(task !== null && description !==null){
      if(selectId > 0){
        updateTask(selectId, { task, description })
        getId(0)
      }else{
        createTasks({ task, description })
        setValueInput('')
        setValueTextArea('')
      }
    }
    
  }

  const getDataInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newValue = e.currentTarget.value
    setValueInput(newValue)
  }

  const getDataTextArea = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const newValue = e.currentTarget.value
    setValueTextArea(newValue)
  }

  return (
    <div className="w-3/4 max-w-md min-w-min mx-auto mt-4 p-2 bg-slate-800 rounded-md text-white md:mt-12">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          id="task"
          className="bg-slate-900 outline-none p-2 rounded-md"
          placeholder="Escriba una tarea"
          value={selectId > 0 ? selectTask : valueInput}
          onChange={getDataInput}
        />
        <textarea
          rows={3}
          name="description"
          id="description"
          className="bg-slate-900 outline-none p-2 rounded-md"
          placeholder="Descripcion"
          value={selectId > 0 ? selectDesc : valueTextArea}
          onChange={getDataTextArea}
        ></textarea>
        <button
          className={selectId > 0 ? 'py-2 bg-blue-900 rounded-md font-bold' : 'py-2 bg-green-900 rounded-md font-bold'}
        >
          {selectId > 0 ? 'Actualizar Tarea' : 'Crear Tarea'}
        </button>
      </form>
    </div>
  )
}

export default TasksForm