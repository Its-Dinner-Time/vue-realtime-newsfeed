export const pages = {
  postPage: (id = null) => `${import.meta.env.VITE_POST_PAGE}${id ? `/${id}` : ''}`,
  authorPage: (id = null) => `${import.meta.env.VITE_AUTHOR_PAGE}${id ? `/${id}` : ''}`,
  loginPage: (check) => `/login${check ? `/${check}` : ''}`,
  signUpPage: (check) => `/signup${check ? `/${check}` : ''}`,
};

export const queries = {
  getAuthor: (field) => (field === 'id' ? import.meta.env.VITE_QUERY_AUTHOR_BY_ID : import.meta.env.VITE_QUERY_AUTHOR),
  getPost: (field) => (field === 'id' ? import.meta.env.VITE_QUERY_POST_BY_ID : import.meta.env.VITE_QUERY_POST),
  with: (schema) => `{ ..., ${schema}-> }`,
  order: (field, direction = 'asc') => `order(${field} ${direction})`,
};
