import React, { Component } from "react";
import "./App.css";
import AddTask from "./AddTask";
import TaskTable from "./TaskTable";
import EditTask from "./EditTask";
import FetchTasksAPI from "./api/FetchTasksApi";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      search: "",
      edit: false,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    FetchTasksAPI.getAllTasks()
      .then((tasks) => this.setState({ tasks }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleDeleteTask = (id) => {
    FetchTasksAPI.removeTask(id).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }))
    );
  };
  handleDoneTask = ({ id, done, finishDate }) => {
    FetchTasksAPI.finishTask(id).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) => {
          if (task.id === id) {
            done = !done;
            finishDate = done ? new Date().toISOString().slice(0, 10) : null;
          }
          return task;
        }),
      }))
    );
  };

  addTask = (createdTask) => {
    FetchTasksAPI.addTask(createdTask).then(() =>
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, createdTask],
      }))
    );
  };
  handleSearch = (e) => {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  };
  handleEditTask = ({ id, name, date, done, finishDate, priority }) => {
    this.setState({
      id,
      name,
      date,
      done,
      finishDate,
      priority,
      edit: !this.state.edit,
    });
  };
  handleUpdateTask = (id, updatedTask) => {
    FetchTasksAPI.replaceTask(updatedTask).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        edit: false,
      }))
    );
  };

  render() {
    const { id, name, date, done, finishDate, priority, edit } = this.state;
    let tasks = this.state.tasks.filter((task) =>
      task.name.toLowerCase().includes(this.state.search)
    );
    return (
      <>
        {edit ? (
          <EditTask
            id={id}
            name={name}
            date={date}
            done={done}
            finishDate={finishDate}
            priority={priority}
            update={this.handleUpdateTask}
            edit={this.handleEditTask}
          />
        ) : (
          <>
            <AddTask addTask={this.addTask} search={this.handleSearch} />
            <TaskTable
              tasks={tasks}
              delete={this.handleDeleteTask}
              done={this.handleDoneTask}
              edit={this.handleEditTask}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
