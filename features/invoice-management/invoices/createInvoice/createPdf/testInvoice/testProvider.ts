import serviceProvider from "../../../types/serviceprovider";

const createTestProvcider = () =>
    serviceProvider(
        {fullName: "Acme Support Services"},
        {email:"billing@acme.com.au"},
        "12 345 678 901"
    );
export default createTestProvcider;