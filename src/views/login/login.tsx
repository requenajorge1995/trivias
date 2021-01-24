import React, { useState } from 'react';

import './login.css';

import CustomSelect from '../../components/custom-select/custom-select';
import TextInput from '../../components/text-input/text-input';
import CustomButton from '../../components/custom-button/custom-button';

import { UserInfo } from '../../types';

import withFetch from '../../hoc/withFetch';

function Login(props: Props) {
  const { setUserInfo, fetchedData } = props;

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const countries = fetchedData.map((country) => country.name);

  return (
    <div className="login">
      <h1>Trivia's App</h1>
      <TextInput name="Full name:" handleChange={setName} value={name} />
      <CustomSelect
        defaultMessage="Select your country"
        handleChange={setCountry}
        entries={countries.map((country) => [country, country])}
      />
      <CustomButton
        disabled={!validateData()}
        onClick={() => setUserInfo({ name, country })}
      >
        Go!
      </CustomButton>
    </div>
  );

  function validateData(): boolean {
    if (name && country) return true;
    return false;
  }
}

type ApiDataResponse = { name: string; [x: string]: any }[];

type Props = {
  setUserInfo(userInfo: UserInfo): void;
  fetchedData: ApiDataResponse;
};

export default withFetch<ApiDataResponse>(
  'https://restcountries.eu/rest/v2/all'
)(Login);
