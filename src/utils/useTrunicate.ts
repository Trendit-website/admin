export const UseTrunicate = (value: string) => {
  if (value.length > 35) {
    return value.slice(0, 50) + ".......";
  } else {
    return value.slice(0, 35);
  }
};
