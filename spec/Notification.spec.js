const chai = require("chai");
const chaiHttp = require("chai-http");
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

let unit = describe("Notification Unit", () => {
  let condition1 = describe("negative condition", () => {
    let spec1 =
      it("Notification cannot be send due to invalid email", (done) => {
        chai
          .request(BASE_URL)
          .get("/admin/notify/faculty/76")
          .set(
            "Authorization",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMTI3MDMwLCJleHAiOjE2MjU3MTkwMzB9.N2A2d_IoVvFAtJhXasgZ9WoDMB8rKLWIsWTu_MFGl50"
          )
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).toBe(422);
            expect(res).toEqual(jasmine.any(Object));
            expect(res.body.message).toEqual("Invalid Email");
            console.log("▶ ", unit.description);
            console.log(condition1.description);
            done();
            console.log("✔", spec1.result.description);
          });
      });
  });
  let condition2 = describe("positve condition", () => {
    let spec2 = it("Notification success", (done) => {
      chai
        .request(BASE_URL)
        .get("/admin/notify/faculty/75")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMTI3MDMwLCJleHAiOjE2MjU3MTkwMzB9.N2A2d_IoVvFAtJhXasgZ9WoDMB8rKLWIsWTu_MFGl50"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body.message).toEqual("Notification success");
          console.log(condition2.description);
          done();
          console.log("✔", spec2.result.description, "\n");
        });
    });
  });
});
