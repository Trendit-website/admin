const UseFormatNumbers = (value: number) => {
  if (value < 1000) {
    return `${value}`;
  } else if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else if (value >= 1000000 && value < 1000000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
};
export default UseFormatNumbers;
