const int = string => parseInt(string, 10);

const dispatch = (state, action) => {
  const key = Object.keys(action)[0];
  const value = action[key];

  switch (key) {
    case 'add':
      return [...state, value];
    case 'remove':
      return [...state.slice(0, int(value)), ...state.slice(int(value) + 1)];
    default:
      return state;
  }
};

module.exports = {
  dispatch,
};
