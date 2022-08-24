const saveData = (field, data) => {
  const getSessionStorageField = JSON.parse(sessionStorage.getItem(field));

  if (!getSessionStorageField) {
    sessionStorage.setItem(field, JSON.stringify(data));
  }

  return getSessionStorageField;
};

const checkSessionData = async (field) => {
  const getSessionStorageField = await JSON.parse(
    sessionStorage.getItem(field)
  );
  return getSessionStorageField;
};

export { saveData, checkSessionData };
