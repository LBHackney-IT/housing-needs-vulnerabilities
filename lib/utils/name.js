const getPossessiveName = (firstName, lastName) => {
  let baseString = `${firstName} ${lastName}'`;
  if (lastName === '') {
    baseString = `${firstName}'`;
  }
  if (baseString[baseString.length - 2] !== 's') {
    baseString += 's';
  }
  return baseString;
};

export { getPossessiveName };
