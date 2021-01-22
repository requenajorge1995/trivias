import React from 'react';

import { Category } from '../../types';
import useCategories from '../../hooks/useCategories';
import CustomSelect from '../../components/custom-select/custom-select';
import LoaderAnimation from '../../components/loader-animation/loader-animation';

function ChooseCategory(props: Props) {
  const { setCategory } = props;
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <LoaderAnimation />;

  if (error) return <h1>{error}</h1>;

  return (
    <div className="choose-category">
      <CustomSelect
        entries={categories.map((category) => [category, category.name])}
        handleChange={setCategory}
        defaultMessage="Select a category"
      />
    </div>
  );
}

type Props = {
  setCategory(category: Category): void;
};

export default ChooseCategory;
