/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import SearchTask from './SearchTask';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 50) {
    errors.name = 'Must be 50 characters or less';
  } else if (values.name.length < 3) {
    errors.name = 'Must have min. 3 characters';
  }

  return errors;
};

const minDate = new Date().toISOString().slice(0, 10);
const AddTask = ({ addTask, search }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      priority: false,
      date: minDate,
      done: false,
      finishDate: null,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      addTask(values);
      resetForm();
    },
  });
  return (
    <div className="jumbotron bg-dark text-white">
      <div className="form-row">
        <div className="form-group col-md-4 mb-4">
          <input
            name="name"
            type="text"
            placeholder="add task"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="form-group col-md-2">
          <div className="form-check">
            <input
              name="priority"
              type="checkbox"
              className="form-check-input"
              checked={formik.values.priority}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="priority">
              priority
            </label>
          </div>
        </div>
        <div className="form-group col-md-2">
          <button
            type="submit"
            className="btn btn-block btn-outline-warning"
            onClick={formik.handleSubmit}
          >
            add
          </button>
        </div>
        <SearchTask search={search} />
      </div>
      {formik.errors.name ? <div className="text text-danger">{formik.errors.name}</div> : null}
    </div>
  );
};

export default AddTask;
