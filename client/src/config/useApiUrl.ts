const useApiUrl = (): string => {
  let apiUrl = '';

  switch (import.meta.env.VITE_NODE_ENV) {
    case 'production':
      apiUrl = import.meta.env.VITE_PROD_SERVER ?? '';
      break;
    case 'development':
      apiUrl = import.meta.env.VITE_LOCAL_SERVER ?? '';
      break;
    default:
      break;
  }

  return apiUrl;
};

export { useApiUrl };
