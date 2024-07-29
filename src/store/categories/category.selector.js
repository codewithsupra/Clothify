// Importing createSelector from reselect
import { createSelector } from "reselect";

// Selector to get the categories slice from the state
const selectCategoryReducer = (state) => state.categories;

// Selector to get the categories array from the categories slice
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector to transform the categories array into a categories map
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
