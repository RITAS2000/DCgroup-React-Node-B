export const paginate = ({ totalItems, page, perPage }) => {
  const totalPages = Math.max(Math.ceil(totalItems / perPage), 1);

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
