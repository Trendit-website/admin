export const UseFormatStatus = (status: string) => {
  switch (status) {
    case "verified":
      return "text-green-500";
    case "completed":
        return "text-green-500";
    case "accepted":
          return "text-green-500";
    case "rejected":
      return "text-red-500";
    case "cancelled":
      return "text-red-500";
    case "pending":
      return "text-yellow-500";
    case "in_review":
      return "text-yellow-500";
  }
};
