import axios from 'axios';
import React, { useState } from 'react';
import classes from '../../styles/CreateTask.module.css';
import store, { connectionStringTasks } from '../../BLL/store';
import { Task } from '../TaskBar/TaskData';

export const CreateTask = (props: { addTask: (task: Task) => void, focusedlistId: number }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleTaskCreate = () => {
    if (inputValue != null && inputValue !== '') {
      setInputValue('');
      axios
        .post(connectionStringTasks, {
          Content: inputValue!,
          Done: false,
          InProgress: false,
          ListId: props.focusedlistId,
        })
        .then((response)=>props.addTask(response.data as Task));
    }
  };

  return (
    <div className={classes.CreateTask}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={classes.CreateTaskInput}
        placeholder="Create task"
      />
      <button
        className={classes.CreateTaskBtn}
        onClick={handleTaskCreate}
        disabled={inputValue === '' || inputValue == null}
      >
        +
      </button>
    </div>
  );
};
