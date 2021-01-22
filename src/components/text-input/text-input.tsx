import React from 'react';

import './text-input.css';

function TextInput(props: Props) {
  const { name, value, handleChange } = props;

  return (
    <label className="text-input-label">
      {name}:
      <input type="tex-input" value={value} onChange={onchange} />
    </label>
  );

  function onchange(event: React.ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }
}

type Props = {
  name: string;
  value: string;
  handleChange(text: string): void;
};

export default TextInput;
