import {useState, useEffect} from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
const App = ()=> {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([]);
   
  useEffect(() => {
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks (tasksFromServer)
    }
    getTasks()
  }, []);

  const fetchTasks = async () =>{
       const res = await fetch ("http://localhost:3001/tasks")
       const data = await res.json()

       return data 
  }

  const addTask = async (task) =>{

    const res = await fetch ("http://localhost:3001/tasks", {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])


    //  const id = Math.floor(Math.random()*1000) + 1
    
    //  const newTask = {id, ...task}
    //  setTasks([...tasks, newTask])
  
    }
   const deleteTask = async (id) =>{
      await fetch (`http://localhost:3001/tasks/${id}`, {
           method:"DELETE"
      })

      // setTasks(tasks.filter((task) => task.id !== id))
   }
  return (
    <div className="container">
       <Header onAdd ={() => setShowAddTask(!showAddTask)} showAdd = {showAddTask} />

       {
         showAddTask && <AddTask onAdd = {addTask}/>
        }
      {
        tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask}/> : "No Tasks to show"
      } 

     
    </div>
  );
}

export default App;
