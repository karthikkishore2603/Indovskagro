export function generateRandomOrderId() {
  // a random 6 digit number
  const characters = "0123456789";
  let randomId = "";
  const length = 6;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }

  return randomId;
}
