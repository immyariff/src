import serviceProvider from "../types/serviceprovider";

const loadBillerDetails = () =>
 serviceProvider(
    {
      fullName: "Rocky Babo Baboa Boxing Co",
    },
    {
      email: "rocky@rocky.com",
    },
    "123 456 789",
  );

export default loadBillerDetails;