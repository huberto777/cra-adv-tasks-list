import React from 'react';
import { useFormik } from 'formik';

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

const EditTask = ({ task, onUpdate, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      name: task.name,
    },
    validate,
    onSubmit: (values) => {
      onUpdate({ ...task, ...values });
    },
  });
  return (
    <div className="jumbotron bg-dark text-white">
      <div className="form-row">
        <div className="form-group col-md-4 mb-4">
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control"
          />
        </div>
        <div className="form-group col-md-2">
          <button
            type="submit"
            className="btn btn-block btn-outline-warning"
            onClick={formik.handleSubmit}
          >
            update
          </button>
        </div>
        <div className="form-group col-md-2">
          <button type="button" className="btn btn-block btn-outline-danger" onClick={onCancel}>
            cancel
          </button>
        </div>
      </div>
      {formik.errors.name ? <div className="text text-danger">{formik.errors.name}</div> : null}
    </div>
  );
};

export default EditTask;
