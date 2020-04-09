import React from "react";
import TaskTableRow from "./TaskTableRow";

const TaskTable = (props) => {
  return (
    <table className="table table-info table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>task name</th>
          <th>add task</th>
          <th>finish date</th>
          <th>ok</th>
          <th>edit</th>
          <th>del</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map((task, index) => (
          <TaskTableRow
            key={task.id}
            index={index}
            task={task}
            onDelete={() => props.delete(task.id)}
            onDone={() => props.done(task)}
            onEdit={() => props.edit(task)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
