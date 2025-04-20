function Header({ taskCompleted }) {
    const style = {
        fontWeight: "bold",
    }
    return (
        <header>
            <span> Task Tracker </span>
            <div style={style}>
                <span>Completed: {taskCompleted.completed}</span>
                <span> | </span>
                <span>Pending: {taskCompleted.pending}</span>
            </div>

            <span style={{ color: "transparent" }}> Task Tracker </span>
        </header>
    )
}

export default Header