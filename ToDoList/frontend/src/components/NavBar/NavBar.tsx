import { List } from './list';
import { ListItem } from './ListItem';
import classes from '../../styles/NavBar.module.css';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connectionStringLists, getLists, storeType } from '../../BLL/store';
import { useEffect, useState } from 'react';
import CreateList from './CreateList';
import axios from 'axios';

const NavBar = (props:{focusedList: (list: List)=>void}) => {  
  const[isLoading, setIsLoading]=useState(false);
  const[lists, setLists]=useState([] as List[]);
  const[focusedListId, setFocusedListId]=useState<number>();
  const[Mount, setMount]=useState(false);

  useEffect(()=>{
    const doGetData = async () => {
      setIsLoading(true);
      setLists(await getLists());
    };
    doGetData();
    setIsLoading(false);
  },[isLoading, focusedListId]);

  useEffect(()=>{setMount(false)},[Mount]);

  const addList = (list: List) => {
    let updatedLists=lists;
    updatedLists.push(list);
    setIsLoading(true);
  };

  const switchList = (listId: number) => {
    setFocusedListId(listId);
    props.focusedList(lists.find(lst=>lst.id==listId)!);
    setMount(true);
  };

  const deleteList = (list: List) => {
    if (window.confirm('Are you shure?')) {
      axios
        .delete(connectionStringLists + '/' + list.id, {
          data: list,
        })
        .then((response) => console.log(response));
      setLists(lists.filter(lst=>lst.id!=list.id));
      setMount(true);
    }
  };

  return (
    <div>
      <CreateList addList={addList} />
      <div className={classes.NavBar}>
        {lists.map((list) => (
          <div
          className={
            list.id==focusedListId ? classes.NavBarItemPressed : classes.NavBarItem
          }
        >
          <ListItem
            key={list.id}
            list={list}
            switchList={switchList}
            deleteList={deleteList}
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
