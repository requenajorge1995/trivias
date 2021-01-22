import React, { useState } from 'react';

import './app.css';

import { UserInfo, Category } from '../../types';

import Login from '../login/login';
import ChooseCategory from '../choose-category/choose-category';
import TriviasHandler from '../trivias-handler/trivias-handler';

function App() {
  const [userInfo, setUserInfo] = useState(undefined as UserInfo | undefined);
  const [category, setCategory] = useState(undefined as Category | undefined);

  return <div className="app">{renderSwitch()}</div>;

  function renderSwitch() {
    switch (true) {
      case !userInfo:
        return <Login setUserInfo={setUserInfo} />;
      case !category:
        return <ChooseCategory setCategory={setCategory} />;
      default:
        return (
          <TriviasHandler categoryId={category!.id} userInfo={userInfo!} />
        );
    }
  }
}

export default App;
