function Tasks({ taskData, setUpdateTask }) {
    const apiUrl = 'https://task-manager-92a03-default-rtdb.asia-southeast1.firebasedatabase.app/tasks';

    function Task({ task }) {

        async function updateTask(task) {
            try {
                const response = await fetch(`${apiUrl}/${task.id}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: task.title,
                        status: task.status
                    })
                });
                const data = await response.json();
                setUpdateTask(prev => !prev);
                return data;
            } catch (error) {
                console.error("Error updating task:", error);
                return null;
            }
        }

        function completeButton(task) {
            updateTask({
                ...task,
                status: task.status === "Completed" ? "Pending" : "Completed"
            });
        }

        function editButton(task) {
            console.log("Edit", task);
            const title = prompt("Edit task title", task.title) || task.title;
            updateTask({
                ...task,
                title: title
            });
        }

        async function deleteTask(task) {
            try {
                const response = await fetch(`${apiUrl}/${task.id}.json`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                alert("Task deleted successfully");
                setUpdateTask(prev => !prev);
                return data;
            } catch (error) {
                console.error("Error deleting task:", error);
                return null;
            }
        }

        function deleteButton(task) {
            deleteTask(task);
        }

        return (
            <div className="task">
                <form style={{ display: "flex", flexDirection: "column", gap: "10px" }} >
                    <input type='text' name="id" id='id' value={task.id} disabled hidden />
                    <input type='text' name="title" id='title' value={task.title} disabled />
                    {/*
                    <br />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="submit" value="Update" />
                        <input type="button" value="Cancel" />
                    </div> 
                    */}
                </form>

                {/* <span>{task.title}</span> */}

                <div>
                    <button onClick={() => completeButton(task)}>{task.status}</button>
                    <button onClick={() => editButton(task)}>Edit</button>
                    <button className="delete" onClick={() => deleteButton(task)}>Delete</button>
                </div>
            </div>
        )
    }


    function AddTask() {
        async function saveTask(task) {
            try {
                const response = await fetch(apiUrl + '.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: task,
                        status: "Pending"
                    })
                });
                const data = await response.json();
                alert("Task added successfully");
                setUpdateTask(prev => !prev);
                return data;
            } catch (error) {
                console.error("Error saving task:", error);
                return null;
            }
        }

        function handleSubmit(event) {
            event.preventDefault();
            const task = event.target.task.value;
            if (task) {
                saveTask(task);
                event.target.task.value = '';
            } else {
                alert("Please enter a task");
            }
        }

        return (
            <form className="task add-task" onSubmit={handleSubmit}>
                <input type='text' name="id" id='id' hidden />
                <input type="text" name="task" id='task' placeholder="Add Task" />
                <button type='submit'>Add</button>
            </form>
        )
    }

    return (
        <div className="tasks">
            <AddTask />
            {taskData.map((task) => (
                <Task task={task} />
            ))}
        </div>
    )
}

export default Tasks