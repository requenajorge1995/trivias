import React from 'react';

import './custom-button.css';

function CustomButton(props: Props) {
  const { children, ...otherProps } = props;
  return (
    <button className="custom-button" {...otherProps}>
      {children}
    </button>
  );
}

type Props = {
  children: JSX.Element | string | number;
  onClick(): void;
  disabled?: boolean;
};

export default CustomButton;
