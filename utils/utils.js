function generateRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
  generateRandomFourDigitNumber,
};
