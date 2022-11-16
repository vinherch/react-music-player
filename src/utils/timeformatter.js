const timeFormatter = (value) => {
  return Math.floor(value / 60) + ":" + ("0" + Math.floor(value % 60)).slice(-2);
};

export default timeFormatter;
