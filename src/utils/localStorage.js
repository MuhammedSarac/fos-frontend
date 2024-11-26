export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const familymember = result ? JSON.parse(result) : null;
  return familymember;
};
export const addFamilymemberToLocalStorage = (user) => {
  localStorage.setItem("familymember", JSON.stringify(user));
};

export const removeFamilymemberFromLocalStorage = () => {
  localStorage.removeItem("familymember");
};

export const getFamilymemberFromLocalStorage = () => {
  const result = localStorage.getItem("familymember");
  const familymember = result ? JSON.parse(result) : null;
  return familymember;
};
