import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskItem from './Task';
import { Task } from './TaskData';
import classes from '../../styles/Tasks.module.css';
import store, { connectionStringTasks, getTasks } from '../../BLL/store';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = (props: {tasks: Task[], check: any, delete: any}) => {

  const _HandleCheck = (task: Task, e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .put(connectionStringTasks + '/' + task.id, {
        ...task,
        done: e.target.checked,
      })
      .then((response) => console.log(response));
    const updatedStoreTasks: Task[] = [];
    store.tasks.forEach((t) => {
      if (t.id === task.id) t.done = e.target.checked;
      updatedStoreTasks.push(t);
    });
    store.tasks = updatedStoreTasks;
  };

  const _DeleteTask = (task: Task) => {
    if (window.confirm('Are you shure?')) {
      axios
        .delete(connectionStringTasks + '/' + task.id, {
          data: task,
        })
        .then((response) => console.log(response));
      store.tasks = store.tasks.filter((t) => t.id !== task.id);
    }
  };

  return (
    <ul className={classes.List}>
      {props.tasks!.map((_task) => (
        <TaskItem
          key={_task.id}
          {...{
            task: _task,
            handleCheck: _HandleCheck,
            deleteTask: _DeleteTask,
          }}
        />
      ))}
    </ul>
  );
};

export default TaskList;
