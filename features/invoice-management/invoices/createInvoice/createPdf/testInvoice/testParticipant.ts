import ndisParticipant from "../../../../../../features/dashboard/managements/client-management/clientTypes";

const createTestParticipant = () =>
  ndisParticipant(
    { fullName: "Jane Doe" },
    { email: "jane.doe@example.com" },
    "430000000",
  );

export default createTestParticipant;
