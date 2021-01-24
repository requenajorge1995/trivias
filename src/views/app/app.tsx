import React, { useState } from 'react';

import './app.css';

import { UserInfo, Category } from '../../types';

import Login from '../login/login';
import ChooseCategory from '../choose-category/choose-category';
import TriviasHandler from '../trivias-handler/trivias-handler-alternative';

import { TriviasApiDataResponse } from '../../types';
import withFetch from '../../hoc/withFetch';

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  const TriviasHandlerWithFetch = withFetch<TriviasApiDataResponse>(
    `https://opentdb.com/api.php?amount=20&category=${category?.id}&type=multiple`
  )(TriviasHandler);

  return <div className="app">{renderSwitch()}</div>;

  function renderSwitch() {
    switch (true) {
      case !userInfo:
        return <Login setUserInfo={setUserInfo} />;
      case !category:
        return <ChooseCategory setCategory={setCategory} />;
      default:
        return <TriviasHandlerWithFetch userInfo={userInfo!} />;
    }
  }
}

export default App;
