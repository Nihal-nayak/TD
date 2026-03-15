import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Comp/NavBar'
import { v4 as uuidv4 } from 'uuid';
import Buttons from './Comp/buttons';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";





function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
  const [ShowFinished, setShowFinished] = useState(true)



  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
    setisLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {

      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isLoaded])



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodo = todos.filter(item => {
      return item.id != id;
    }
    )
    settodos(newtodo)


  }

  const handleDelete = (e, id) => {
    let newtodo = todos.filter(item => {
      return item.id != id;
    }
    )
    settodos(newtodo)


  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")


  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e, id) => {

    let idx = todos.findIndex(e => {
      return e.id === id
    })

    let newtodo = [...todos]
    newtodo[idx].isCompleted = !newtodo[idx].isCompleted;
    settodos(newtodo)

  }

  const togglefinished=() => {
    setShowFinished(!ShowFinished)
  }
  


  return (
    <>
      <NavBar />
      
      <div className="md:container  mx-10 md:mx-auto bg-violet-200 rounded-xl p-5 my-5 min-h-[80vh] md:w-1/2">
      <h2 className='font-bold text-center text-xl'>iTask - Manage your task at one place</h2>
        <div className="Addtodo my-5 flex flex-col gap-3">

          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex gap-3">
          <input  
           type="text" placeholder='  enter your todo ' 
           onChange={handleChange} value={todo} className='rounded-full w-full py-2 px-4' />
          <Buttons disabled={todo.length<3}   onClick={handleAdd} name="Save" />

          </div>
          

        </div>

        <div className='flex gap-2'>
                <input type="checkbox" checked={ShowFinished} onChange={togglefinished} /> <div >Show Finished tasks</div>
        </div>


        <h2 className='font-bold text-lg my-3'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-bold mx-3 my-2 text-purple-800 flex gap-2'>No Todos To Display <img src="https://png.pngtree.com/png-vector/20190217/ourmid/pngtree-smile-vector-template-design-illustration-png-image_555080.jpg" alt="" className='w-6 rounded-md' /></div>}
          {todos.map(item => {

            //if your showfinished is toggled show only those which are finished and if not toggled on then show which are not finished 
            return (ShowFinished || !item.isCompleted) &&<div key={item.id} className="todo  flex my-2 justify-between w-100%">
              <div className='flex gap-3'>
                <input className='cursor-pointer' type="checkbox" onChange={(e) => handleCheckbox(e, item.id)} checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}> {item.todo}</div>
              </div>
              <div className="buttons flex h-full gap-2 mx-2">
                <Buttons onClick={(e) => handleEdit(e, item.id)}  icon={RiEdit2Fill} />
                <Buttons onClick={(e) => handleDelete(e, item.id)} icon={MdDelete} />
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
