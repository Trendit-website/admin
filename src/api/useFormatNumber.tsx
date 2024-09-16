const useFormatNumbers = (value: number) => {
  if (value < 1000) {
    return `${value}`;
  } else if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  } else if (value >= 1000000 && value < 1000000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
};
export default useFormatNumbers;
