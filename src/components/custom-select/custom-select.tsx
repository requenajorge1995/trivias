import React from 'react';

function CustomSelect<T>(props: Props<T>) {
  const { defaultMessage, handleChange, entries } = props;

  return (
    <select
      className="custom-select"
      onChange={(event) =>
        handleChange(entries[parseInt(event.target.value)][0])
      }
      defaultValue={-1}
    >
      <option value={-1} disabled>
        {defaultMessage}
      </option>

      {entries.map(([, name], index) => (
        <option key={index} value={index}>
          {name}
        </option>
      ))}
    </select>
  );
}

type Props<T> = {
  entries: [T, string][];
  defaultMessage: string;
  handleChange(optionSelected: T): void;
};

export default CustomSelect;
