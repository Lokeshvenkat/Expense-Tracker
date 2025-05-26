/**
 * Generates a random unique ID consisting of 6 alphanumeric characters.
 *
 * @returns {string} A 6-character unique ID.
 */
function generateUniqueID() {
  // Characters allowed in the ID
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let id = "";

  // Generate 6 random characters from the set
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

export default generateUniqueID;
