import React from 'react';
import myImg from '../../Icons/tick_icon.png';
import classes from '../../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <div className={classes.Logo}>
      <div className={classes.InlineBlock}>
        <img src={myImg} alt="tick_logo" className={classes.ImgLogo} />
      </div>
      <div className={classes.InlineBlock}>
        <h1 className={classes.HeaderTop}>toDo</h1>
        <h1 className={classes.HeaderBottom}>List</h1>
      </div>
    </div>
  );
};

export default Header;
