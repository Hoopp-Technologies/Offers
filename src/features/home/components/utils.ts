export const getDaysRemaining = (endDate: string) => {
  switch (endDate) {
    case "24 hours":
      return 1;
    case "48 hours":
      return 2;
    case "7 days":
      return 7;
    case "14 days":
      return 14;
    default:
      return undefined;
  }
};
