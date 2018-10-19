const apiUrl = () => {
  let api = 'https://json2swagger-api.herokuapp.com';

  if (window.location.hostname === 'localhost') {
    api = 'http://localhost:9292';
  }

  return api;
};

export default apiUrl;
