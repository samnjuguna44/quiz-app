//shuffle the array otherwise correct answer will always be in the same place
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);