const useLogout = (): any => {
  localStorage.removeItem('movie-app-token');
  window.location.href = '/';
};

export { useLogout };
