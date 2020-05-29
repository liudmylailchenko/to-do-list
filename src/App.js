import React from 'react';
import store from 'store';
import Item from './Item';

class App extends React.Component {
  state = {
    input: '',
    tasks: [],
  };

  getId = () => {
    return this.state.tasks.length + 1;
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input === '') {
      return;
    }
    const nextTasks = [
      ...this.state.tasks,
      {
        text: this.state.input,
        done: false,
        id: this.getId(),
      },
    ];

    this.setState({
      tasks: nextTasks,
      input: '',
    });

    store.set('tasks', nextTasks);
  };

  toggle = (event, id) => {
    const nextTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: event.target.checked,
        };
      }
      return task;
    });

    this.setState({
      tasks: nextTasks,
    });

    store.set('tasks', nextTasks);
  };

  componentDidMount() {
    this.setState({
      tasks: store.get('tasks') || [],
    });
  }

  handleDelete = (id) => {
    const deleteEl = this.state.tasks.findIndex((el) => el.id === id);
    const nextTasks = [...this.state.tasks];
    if (deleteEl > -1) {
      nextTasks.splice(deleteEl, 1);
    }
    this.setState({
      tasks: nextTasks,
    });
    store.set('tasks', nextTasks);
  };

  render() {
    const sortedTasks = this.state.tasks.sort((a, b) => {
      if (a.done === b.done) {
        return a.id < b.id ? -1 : 1;
      }

      return a.done ? 1 : -1;
    });

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <h1 className="heading">To do list</h1>

            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter what to do"
                  onChange={this.handleChange}
                  value={this.state.input}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="list-grop">
              {sortedTasks.map((task) => (
                <Item
                  key={task.id}
                  task={task}
                  onToggle={this.toggle}
                  onDelete={this.handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
