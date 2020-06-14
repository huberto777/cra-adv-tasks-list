/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SearchTask from './SearchTask';

class AddTask extends Component {
  minDate = new Date().toISOString().slice(0, 10);
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      priority: false,
      date: this.minDate,
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleInput = (e) => {
    if (e.target.type === 'checkbox') {
      this.setState({
        priority: e.target.checked,
      });
    }
    if (e.target.type === 'text') {
      this.setState({
        name: e.target.value,
      });
      // console.log(e.target.value);
    }
    // if (e.target.type === "date") {
    //   this.setState({
    //     date: e.target.value,
    //   });
    // }
  };

  handleClick = () => {
    const { name, priority, date } = this.state;
    if (name.length < 3) return alert('task must have min. 3 characters');
    this.props.addTask({ id: uuidv4(), name, priority, date, done: false, finishDate: null });
    this.setState({
      name: '',
      priority: false,
    });
  };

  render() {
    // let maxDate = this.minDate.slice(0, 4) * 1 + 1;
    // maxDate = maxDate + "-12-31";
    // console.log(maxDate);
    return (
      <div className="jumbotron bg-dark text-white">
        <div className="form-row">
          <div className="form-group col-md-4 mb-4">
            <input
              type="text"
              placeholder="add task"
              className="form-control"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-group col-md-2">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="check1"
                checked={this.state.priority}
                onChange={this.handleInput}
              />
              <label className="form-check-label" htmlFor="check1">
                priority task
              </label>
            </div>
          </div>
          <div className="form-group col-md-2">
            <button
              type="submit"
              className="btn btn-block btn-outline-warning"
              onClick={this.handleClick}
            >
              add
            </button>
          </div>
          <SearchTask search={this.props.search} />
        </div>
      </div>
    );
  }
}
export default AddTask;
