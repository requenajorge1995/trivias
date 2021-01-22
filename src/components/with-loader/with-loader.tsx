import React from 'react';

type LoaderProps = {
  isLoading: boolean;
  error: Error | null;
};

function withLoader<T extends LoaderProps>(Component: React.ComponentType<T>) {
  return function ComponentWithLoader(props: T) {
    // const { isLoading, error, ...ownProps } = props;

    // if (isLoading) return <h1>loading</h1>;

    // if (error) return <h1>error</h1>;

    return <Component {...props} />;
  };
}

export default withLoader;
