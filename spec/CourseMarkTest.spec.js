const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Course Marks Allocation", () => {
  describe("boundary condition", () => {
    it("marks = 0 and internals = 0", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "0", internals: "0" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.updatedMark).to.be.an("Array");
          done();
        });
    });
    it("marks = 50 and internals = 50", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "50", internals: "50" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.updatedMark).to.be.an("Array");
          done();
        });
    });
  });
  describe("negative condition", () => {
    it("marks = 20 and internals = 70", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "20", internals: "70" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Failed to update");
          done();
        });
    });
    it("marks = -20 and internals = 40", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "-20", internals: "40" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          expect(res).to.be.an("object");
          expect(res.body.message).to.equal("Failed to update");
          done();
        });
    });
  });
  describe("positive condition", () => {
    it("marks = 40 and internals = 30", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "40", internals: "30" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.updatedMark).to.be.an("Array");
          done();
        });
    });
    it("marks = 27 and internals = 39", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/mark/update/15CSE213")
        .send({ id: "anand123", marks: "27", internals: "39" })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzA3NTgzNiwiZXhwIjoxNjI1NjY3ODM2fQ.jnXur9XbfkjBSBUiJlilP1h5Pa4gcdNGTWeetQuv-_E"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body.updatedMark).to.be.an("Array");
          done();
        });
    });
  });
});
