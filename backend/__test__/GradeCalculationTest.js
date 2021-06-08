const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Grade Calculation", () => {
  describe("boundary condition", () => {
    it("total = 89 => Grade = O", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "89",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.grade).to.equal("O");
          done();
        });
    });
    it("total = 17 => Grade = F", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "17",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.grade).to.equal("F");
          done();
        });
    });
  });
  describe("negative condition", () => {
    it("total = 102 => Grade = invalid", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "102",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid total");
          done();
        });
    });
    it("total = -32 => Grade = invalid", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "-32",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Invalid total");
          done();
        });
    });
  });
  describe("positive condition", () => {
    it("total = 71 => Grade = A", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "71",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.grade).to.equal("A");
          done();
        });
    });
    it("total = 38 => Grade = C", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "anand123",
          total: "38",
          O: "82",
          Ap: "75",
          A: "66",
          Bp: "57",
          B: "44",
          C: "35",
          P: "26",
          F: "0",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.grade).to.equal("C");
          done();
        });
    });
  });
});
