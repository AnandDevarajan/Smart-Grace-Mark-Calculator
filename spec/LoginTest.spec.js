const chai = require("chai");
const chaiHttp = require("chai-http");
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

let unit = describe("Authentication Unit", () => {
  let condition1 = describe("boundary condition", () => {
    let spec1 = it("Invalid Email and Password", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "", password: "" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual(jasmine.any(String));
          console.log("▶ ", unit.description);
          console.log(condition1.description);
          done();
          console.log("✔",spec1.result.description);
        });
    });
  });
  let condition2 = describe("negative condition", () => {
    let spec2 = it("Invalid Email", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "student@test123.com", password: "test123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual("Invalid Email");
          console.log(condition2.description);
          done();
          console.log("✔",spec2.result.description);
        });
    });
    let spec3 = it("Invalid Password", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "student@test.com", password: "test1234" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual("Invalid Password");
          done();
          console.log("✔",spec3.result.description);
        });
    });
  });
  let condition3 = describe("positive condition", () => {
    let spec4 = it("Auth Success", (done) => {
      chai
        .request(BASE_URL)
        .post("/student/login")
        .send({ email: "student@test.com", password: "test123" })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.result).toEqual(jasmine.any(Object));
          expect(res.body.token).toEqual(jasmine.any(String));
          console.log(condition3.description);
          done();
          console.log("✔",spec4.result.description, "\n");
        });
    });
  });
});
