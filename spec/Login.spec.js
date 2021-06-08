const request = require("request");
let base_url = "http://127.0.0.1:5000/admin/login";

describe("Authentication Unit\n", () => {
  describe("boundary condition\n", () => {
    const invalidRequest = {
      method: "post",
      body: { email: "", password: "" },
    };
    it("Invalid Email and Password", (done) => {
      const mockApiCall = mockAPI.simulateAsyncCall(invalidRequest);
      return mockApiCall.then(response=>{
          
      })
    });
  });
});
