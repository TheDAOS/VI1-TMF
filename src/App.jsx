import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {

  const api = `https://task-manager-92a03-default-rtdb.asia-southeast1.firebasedatabase.app/tasks`;
  const [taskData, setTaskData] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState({ completed: 0, pending: 0 });
  const [updateTask, setUpdateTask] = useState(true);

  async function getTasks() {
    try {
      const response = await fetch(api + '.json');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const tasks = Object.entries(data).map(([id, task]) => ({ id, ...task }));
      // console.log("task", tasks);

      setTaskData(tasks);


      setTaskCompleted(tasks.reduce((acc, task) => {
        if (task.status === "Completed") acc.completed += 1;
        else acc.pending += 1

        return acc;
      }, { completed: 0, pending: 0 }));


    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, [updateTask]);

  return (
    <>
      <Header taskCompleted={taskCompleted} />
      <Tasks taskData={taskData} setUpdateTask={setUpdateTask} />
    </>
  )
}

export default App
