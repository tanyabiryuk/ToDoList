import { ChangeEvent } from 'react';
import { Task } from './TaskData';
import classes from '../../styles/Tasks.module.css';

const TaskItem = (props: {
  task: Task;
  handleCheck: (task: Task, e: ChangeEvent<HTMLInputElement>) => void;
  deleteTask: (task: Task) => void;
}) => {

  const classNameItem = props.task.done
    ? classes.ListItemDone
    : classes.ListItem;
  const classNameText = props.task.done
    ? classes.ListItemTextDone
    : classes.ListItemText;
    
  return (
    <li className={classNameItem}>
      <input
        type="checkbox"
        className={classes.ListItem_checkbox}
        defaultChecked={props.task.done}
        onChange={(e) => props.handleCheck(props.task, e)}
      />
      <div className={classNameText}>{props.task!.content}</div>
      <button
        className={classes.ListItem_btn}
        onClick={() => {
          props.deleteTask(props.task);
        }}
      >
        +
      </button>
    </li>
  );
};

export default TaskItem;
