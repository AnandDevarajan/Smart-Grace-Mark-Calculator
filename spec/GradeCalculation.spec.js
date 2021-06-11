const chai = require("chai");
const chaiHttp = require("chai-http");
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Grade Calculation", () => {
  describe("boundary condition", () => {
    it("total = 89 => Grade = O", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.grade).toEqual("O");
          done();
        });
    });
    it("total = 17 => Grade = F", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.grade).toEqual("F");
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
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(400);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.message).toEqual("Invalid total");
          done();
        });
    });
    it("total = -32 => Grade = invalid", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(400);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.message).toEqual("Invalid total");
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
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.grade).toEqual("A");
          done();
        });
    });
    it("total = 38 => Grade = C", (done) => {
      chai
        .request(BASE_URL)
        .put("/course/update/grade/15CSE213")
        .send({
          id: "STUDENTTEST12345",
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
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.grade).toEqual("C");
          done();
        });
    });
  });
});
