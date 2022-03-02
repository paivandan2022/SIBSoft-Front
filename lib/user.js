const keyData = "user";

const getUser = () => {
  const userData = localStorage.getItem(keyData);
  const userDataJson = JSON.parse(userData);
  return userDataJson;
};

const deleteUser = () => {
  localStorage.removeItem(keyData);
};

export default {
  getUser,
  deleteUser,
};
