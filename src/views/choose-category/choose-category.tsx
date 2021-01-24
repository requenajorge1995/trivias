import React from 'react';

import './choose-category.css';

import { Category } from '../../types';
import CustomSelect from '../../components/custom-select/custom-select';
import withFetch from '../../hoc/withFetch';

function ChooseCategory(props: Props) {
  const { setCategory, fetchedData } = props;
  const { trivia_categories: categories } = fetchedData;

  return (
    <div className="choose-category">
      <h1>Pick a Category</h1>
      <CustomSelect
        entries={categories.map((category) => [category, category.name])}
        handleChange={setCategory}
        defaultMessage="Categories"
      />
    </div>
  );
}

type Props = {
  setCategory(category: Category): void;
  fetchedData: ApiDataResponse;
};

type ApiDataResponse = { trivia_categories: Category[] };

export default withFetch<ApiDataResponse>(
  'https://opentdb.com/api_category.php'
)(ChooseCategory);
