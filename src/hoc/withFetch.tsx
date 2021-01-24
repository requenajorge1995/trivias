import React from 'react';
import useFetch from '../hooks/useFetch';

import './withFetch.css';

function withFetch<T>(input: RequestInfo, init?: RequestInit) {
  return function wrapper<P extends { fetchedData: T }>(
    Component: React.ComponentType<P>
  ) {
    return function ComponentWithFecth(props: Omit<P, 'fetchedData'>) {
      const { data, isLoading, error } = useFetch<T>(input, init);

      switch (true) {
        case isLoading:
          return <div className="loader" />;

        case !!error:
          return <h1>{error!.message}</h1>;

        default:
          return <Component {...({ ...props, fetchedData: data } as P)} />;
      }
    };
  };
}

export default withFetch;
