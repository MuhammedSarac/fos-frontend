import customFetch from "../../utils/axios";

export const registerFamilymemberThunk = (familymember) => {
  try {
    const resp = customFetch.post("/familymembers", familymember);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const deleteFamilymemberThunk = (id) => {
  try {
    const resp = customFetch.delete(`/familymembers/${id}`);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const getFamilymemberThunk = (id) => {
  try {
    const resp = customFetch.get(`/familymembers/${id}`);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const getAllFamilymemberThunk = (familyid) => {
  try {
    const resp = customFetch.get(`/familymembers/all/${familyid}`);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
