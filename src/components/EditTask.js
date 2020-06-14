import React, { Component } from 'react';

class EditTask extends Component {
  state = {
    name: this.props.task.name,
  };
  handleInput = (e) => {
    if (e.target.type === 'text') {
      this.setState({
        name: e.target.value,
      });
    }
    if (e.target.type === 'checkbox') {
      this.setState({
        priority: e.target.value,
      });
    }
  };
  handleUpdate = () => {
    const { name } = this.state;
    const { task, onUpdate } = this.props;
    onUpdate({ ...task, name });
  };
  render() {
    const { name } = this.state;
    return (
      <div className="jumbotron bg-dark text-white">
        <div className="form-row">
          <div className="form-group col-md-4 mb-4">
            <input
              type="text"
              placeholder="add task"
              className="form-control"
              value={name}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group col-md-2">
            <button
              type="submit"
              className="btn btn-block btn-outline-warning"
              onClick={this.handleUpdate}
            >
              update
            </button>
          </div>
          <div className="form-group col-md-2">
            <button
              type="button"
              className="btn btn-block btn-outline-danger"
              onClick={this.props.cancel}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTask;
