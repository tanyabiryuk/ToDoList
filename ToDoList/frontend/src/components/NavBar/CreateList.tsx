import React, { useState } from 'react';
import classes from '../../styles/NavBar.module.css';
import store, { connectionStringLists, getLists } from '../../BLL/store';
import axios from 'axios';
import { List } from './list';

export const CreateList = (props: { addList: (list: List) => void }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleListCreate = () => {
    if (inputValue != null && inputValue !== '') {
      setInputValue('');
      axios.post(connectionStringLists, {
        title: inputValue!,
      }).then((response)=>props.addList(response.data as List));
    }
  };

  return (
    <div className={classes.CreateList}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={classes.CreateListInput}
        placeholder="New list"
      />
      <button
        className={classes.CreateListBtn}
        onClick={handleListCreate}
        disabled={inputValue === '' || inputValue == null}
      >
        +
      </button>
    </div>
  );
};

export default CreateList;
