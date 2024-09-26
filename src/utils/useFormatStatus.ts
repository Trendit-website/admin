export const UseFormatStatus = (status: string) => {
  switch (status) {
    case "verified":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
    case "pending":
      return "text-pending";
  }
};
