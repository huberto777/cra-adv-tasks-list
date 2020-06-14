import React, { Component } from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';
import FetchTasksAPI from './api/FetchTasksApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './ErrorBoundary';

const TaskTable = React.lazy(() => import('./TaskTable'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      search: '',
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

  handleDeleteTask = ({ id }) => {
    FetchTasksAPI.removeTask(id).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task.id !== id),
      })),
    );
  };

  addTask = (createdTask) => {
    FetchTasksAPI.addTask(createdTask).then(() =>
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, createdTask],
      })),
    );
  };
  handleSearch = (e) => {
    this.setState({
      search: e.target.value.toLowerCase(),
    });
  };
  handleEditTask = (task) => {
    this.setState({
      task,
      edit: true,
    });
  };
  cancelEdit = () => {
    this.setState({
      edit: false,
    });
  };
  handleUpdateTask = (updatedTask) => {
    FetchTasksAPI.replaceTask(updatedTask).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        edit: false,
      })),
    );
  };
  handleDoneTask = ({ id }) => {
    FetchTasksAPI.finishTask(id).then(() =>
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) => {
          if (task.id === id) {
            task.done = !task.done;
            task.finishDate = task.done ? new Date().toISOString().slice(0, 10) : null;
          }
          return task;
        }),
      })),
    );
  };

  render() {
    const { task, edit } = this.state;
    const tasks = this.state.tasks.filter((task) =>
      task.name.toLowerCase().includes(this.state.search),
    );
    return (
      <ErrorBoundary message="coś nie działa w całej aplikacji...">
        <React.Suspense fallback="... Loading">
          {edit ? (
            <EditTask task={task} onUpdate={this.handleUpdateTask} cancel={this.cancelEdit} />
          ) : (
            <>
              <AddTask addTask={this.addTask} search={this.handleSearch} />
              <TaskTable
                tasks={tasks}
                onDelete={this.handleDeleteTask}
                onDone={this.handleDoneTask}
                onEdit={this.handleEditTask}
              />
            </>
          )}
        </React.Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
