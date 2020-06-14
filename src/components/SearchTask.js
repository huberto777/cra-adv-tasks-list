import React from 'react';

const SearchTask = (props) => {
  return (
    <div className="form-group col-md-4">
      <input
        type="text"
        placeholder="search task"
        className="form-control"
        onInput={props.search}
      />
    </div>
  );
};
export default SearchTask;
