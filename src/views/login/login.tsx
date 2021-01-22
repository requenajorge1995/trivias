import React, { useState } from 'react';

import './login.css';

import CustomSelect from '../../components/custom-select/custom-select';
import TextInput from '../../components/text-input/text-input';
import CustomButton from '../../components/custom-button/custom-button';
import LoaderAnimation from '../../components/loader-animation/loader-animation';

import { UserInfo } from '../../types';
import useCountries from '../../hooks/useCountries';

function Login(props: Props) {
  const { setUserInfo } = props;

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const { countries, isLoading, error } = useCountries();

  if (isLoading) return <LoaderAnimation />;

  if (error) return <h1>{error}</h1>;

  return (
    <div className="login">
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

type Props = {
  setUserInfo(userInfo: UserInfo): void;
};

export default Login;
