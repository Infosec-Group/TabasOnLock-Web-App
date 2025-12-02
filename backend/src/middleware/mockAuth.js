const mockAuth = (req, res, next) => {
    const MOCKED_CUSTOMER_ID = "692eb7c3e658edab8f6212f3"; // Example mocked customer ID

    req.user = { id: MOCKED_CUSTOMER_ID };
    next();
};
module.exports = mockAuth;