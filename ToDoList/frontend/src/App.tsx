import classes from './styles/styles.module.css';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import { TaskBar } from './components/TaskBar/TaskBar';
import { useEffect, useState } from 'react';
import { List } from './components/NavBar/list';

const App: React.FC = () => {
  const[focusedList, setFocusedList]=useState({Id:0, title:"General"} as List);

  const switchList = (list: List)=>{
    setFocusedList(list);
  }

  useEffect(()=>{},[focusedList]);

  return (
    <div className={classes.body}>
      <Header />
       <table className={classes.tableStructure} cellSpacing="0" cellPadding="0">
        <tr>
          <td>
            <NavBar focusedList = {switchList} />
          </td>
          <td>
            <TaskBar focusedList={focusedList!} />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default App;
