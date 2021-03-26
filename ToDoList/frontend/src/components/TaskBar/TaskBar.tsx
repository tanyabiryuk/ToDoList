import { CreateTask } from '../CreateTask/CreateTask';
import classes from '../../styles/Tasks.module.css';
import React, { useEffect, useState } from 'react';
import { Task } from './TaskData';
import TaskItem from './Task';
import { connectionStringTasks, getAllTasks, getCurrentTasks, getTasks } from '../../BLL/store';
import axios from 'axios';
import { List } from '../NavBar/list';

export const TaskBar = (props:{focusedList: List}) => {
  const[isLoading, setIsLoading]=useState(true);
  const[tasks, setTasks]=useState([] as Task[]);
  const[focusedlist, setFocusedList]=useState(0);
  const[Mount, setMount]=useState(false);

  if(focusedlist != props.focusedList.id){
    setFocusedList(props.focusedList.id!);
  }

  useEffect(()=>{
    const doGetData = async () => {
      setIsLoading(true);
      focusedlist==undefined? setTasks(getAllTasks()) : setTasks(getCurrentTasks(props.focusedList.id!));
    };
    doGetData();
    setIsLoading(false);
  },[isLoading, focusedlist]);

  useEffect(()=>{setMount(false)},[Mount]);

  
  const _HandleCheck = (task: Task, e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .put(connectionStringTasks + '/' + task.id, {
        ...task,
        done: e.target.checked,
      })
      .then((response) => console.log(response));
      tasks.forEach((t) => {
        if (t.id === task.id) t.done = e.target.checked;
      });
      setMount(true);
  };

  const _DeleteTask = (task: Task) => {
    if (window.confirm('Are you shure?')) {
      axios
        .delete(connectionStringTasks + '/' + task.id, {
          data: task,
        })
        .then((response) => console.log(response));
      setTasks(tasks.filter((t) => t.id !== task.id));
      setMount(true);
    }
  };

  const addTask = (task: Task) => {
    let updatedTasks=tasks;
    updatedTasks.push(task);
    setMount(true);
  };

  return (
    <div className={classes.TaskBar}>
      <CreateTask addTask={addTask} focusedlistId={focusedlist}/>
      <h4 className={classes.Title}>{props.focusedList.title}</h4>
      <ul className={classes.List}>
      {tasks!.map((_task) => (
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
    </div>
  );
};
