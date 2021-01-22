import React, { useState } from 'react';
import { UserInfo, Category, Result } from '../../types';
import './app.css';

import Login from '../login/login';
import ChooseCategory from '../choose-category/choose-category';
import TriviasContainer from '../trivias-container/trivias-container';

function App() {
  const [userInfo, setUserInfo] = useState(undefined as UserInfo | undefined);
  const [category, setCategory] = useState(undefined as Category | undefined);
  const [result, setResult] = useState(undefined as Result | undefined);

  return <div className="app">{renderSwitch()}</div>;

  function renderSwitch() {
    switch (true) {
      case !userInfo:
        return <Login setUserInfo={setUserInfo} />;

      case !category:
        return <ChooseCategory setCategory={setCategory} />;

      case !result:
        return (
          <TriviasContainer categoryId={category!.id} setResult={setResult} />
        );
    }
  }
}

export default App;
