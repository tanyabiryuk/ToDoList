import classes from '../../styles/NavBar.module.css';
import { List } from './list';


export const ListItem = (props: {
  list: List;
  switchList: (listId: number) => void;
  deleteList: (list: List) => void;
}) => {

  return (
    <div className={classes.ListLink}>
      <button
        className={classes.DeleteBtn}
        onClick={() => props.deleteList(props.list)}
      >
        +
      </button>
      <span
        className={classes.ListLink}
        onClick={() => {
          props.switchList(props.list.id!);
        }}
      >
        {props.list.title}
      </span>
    </div>
  );
};

export default ListItem;
