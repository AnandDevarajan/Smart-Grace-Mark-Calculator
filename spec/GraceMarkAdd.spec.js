const chai = require("chai");
const chaiHttp = require("chai-http");
const BASE_URL = "http://127.0.0.1:5000";
chai.use(chaiHttp);

describe("Grace Mark Addition", () => {
  describe("boundary condition", () => {
    it("15CSE201 => P => Total => 24", (done) => {
      chai
        .request(BASE_URL)
        .put("/student/caluclate/new/grade/STUDENTTEST12345")
        .send({
          grace: [
            {
              O: "74",
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              P: "23",
              CourseID: "15CSE201",
              Grade: "F",
              Total: "20",
              credits: "4",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE213",
              Grade: "",
              O: "82",
              P: "26",
              Total: "",
              credits: "4",
            },
            {
              A: "63",
              Ap: "72",
              B: "42",
              Bp: "54",
              C: "33",
              CourseID: "15CSE312",
              Grade: "F",
              O: "78",
              P: "25",
              Total: "21",
              credits: "3",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE302",
              Grade: "B+",
              O: "82",
              P: "26",
              Total: "60",
              credits: "1",
            },
            {
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              CourseID: "15CSE313",
              Grade: "C",
              O: "74",
              P: "23",
              Total: "44",
              credits: "2",
            },
          ],
          gm: "4",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMzI0Njk1LCJleHAiOjE2MjU5MTY2OTV9.O2-ThpkBcBvCjJ82xfqGDxMrmNb65RCuTdzCG9QM1Yg"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.Total).toEqual(24);
          expect(res.body.Grade).toEqual("P");
          done();
        });
    });

    it("15CSE302 => A+ => Total => 77", (done) => {
      chai
        .request(BASE_URL)
        .put("/student/caluclate/new/grade/STUDENTTEST12345")
        .send({
          grace: [
            {
              O: "74",
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              P: "23",
              CourseID: "15CSE201",
              Grade: "F",
              Total: "18",
              credits: "4",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE213",
              Grade: "P",
              O: "82",
              P: "26",
              Total: "27",
              credits: "4",
            },
            {
              A: "63",
              Ap: "72",
              B: "42",
              Bp: "54",
              C: "33",
              CourseID: "15CSE312",
              Grade: "F",
              O: "78",
              P: "25",
              Total: "20",
              credits: "3",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE302",
              Grade: "A",
              O: "82",
              P: "26",
              Total: "73",
              credits: "1",
            },
            {
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              CourseID: "15CSE313",
              Grade: "C",
              O: "74",
              P: "23",
              Total: "44",
              credits: "2",
            },
          ],
          gm: "4",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTYyMzM4OTMxMCwiZXhwIjoxNjI1OTgxMzEwfQ.oBSmozaBGyWyRocgpHKwhk9tckL94EC4mGYFVNRgOoU"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.Total).toEqual(77);
          expect(res.body.Grade).toEqual("A+");
          done();
        });
    });

    it("No change", () => {
      chai
        .request(BASE_URL)
        .put("/student/caluclate/new/grade/test1")
        .send({
          grace: [
            {
              O: "74",
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              P: "23",
              CourseID: "15CSE201",
              Grade: "P",
              Total: "24",
              credits: "4",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE213",
              Grade: "P",
              O: "82",
              P: "26",
              Total: "27",
              credits: "4",
            },
            {
              A: "63",
              Ap: "72",
              B: "42",
              Bp: "54",
              C: "33",
              CourseID: "15CSE312",
              Grade: "B",
              O: "78",
              P: "25",
              Total: "47",
              credits: "3",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE302",
              Grade: "A",
              O: "82",
              P: "26",
              Total: "70",
              credits: "1",
            },
            {
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              CourseID: "15CSE313",
              Grade: "C",
              O: "74",
              P: "23",
              Total: "44",
              credits: "2",
            },
          ],
          gm: "4",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMzI0Njk1LCJleHAiOjE2MjU5MTY2OTV9.O2-ThpkBcBvCjJ82xfqGDxMrmNb65RCuTdzCG9QM1Yg"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.message).toEqual("No Grade Change");
        });
    });
  });
  describe("negative condition", () => {
    it("No Grace Mark available", (done) => {
      chai
        .request(BASE_URL)
        .put("/student/caluclate/new/grade/STUDENTTEST12345")
        .send({
          grace: [
            {
              O: "",
              A: "",
              Ap: "",
              B: "",
              Bp: "",
              C: "",
              P: "",
              CourseID: "15CSE201",
              Grade: "P",
              Total: "23",
              credits: "4",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE213",
              Grade: "P",
              O: "82",
              P: "26",
              Total: "27",
              credits: "4",
            },
            {
              A: "63",
              Ap: "72",
              B: "42",
              Bp: "54",
              C: "33",
              CourseID: "15CSE312",
              Grade: "B",
              O: "78",
              P: "25",
              Total: "47",
              credits: "3",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE302",
              Grade: "A",
              O: "82",
              P: "26",
              Total: "70",
              credits: "1",
            },
            {
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              CourseID: "15CSE313",
              Grade: "C",
              O: "74",
              P: "23",
              Total: "44",
              credits: "2",
            },
          ],
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMzI0Njk1LCJleHAiOjE2MjU5MTY2OTV9.O2-ThpkBcBvCjJ82xfqGDxMrmNb65RCuTdzCG9QM1Yg"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.message).toEqual("No Grace Mark");
          done();
        });
    });
    it("Grade Ranges not set", (done) => {
      chai
        .request(BASE_URL)
        .put("/student/caluclate/new/grade/STUDENTTEST12345")
        .send({
          grace: [
            {
              O: "",
              A: "",
              Ap: "",
              B: "",
              Bp: "",
              C: "",
              P: "",
              CourseID: "15CSE201",
              Grade: "P",
              Total: "23",
              credits: "4",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE213",
              Grade: "P",
              O: "82",
              P: "26",
              Total: "27",
              credits: "4",
            },
            {
              A: "63",
              Ap: "72",
              B: "42",
              Bp: "54",
              C: "33",
              CourseID: "15CSE312",
              Grade: "B",
              O: "78",
              P: "25",
              Total: "47",
              credits: "3",
            },
            {
              A: "66",
              Ap: "75",
              B: "44",
              Bp: "57",
              C: "35",
              CourseID: "15CSE302",
              Grade: "A",
              O: "82",
              P: "26",
              Total: "70",
              credits: "1",
            },
            {
              A: "59",
              Ap: "67",
              B: "39",
              Bp: "51",
              C: "31",
              CourseID: "15CSE313",
              Grade: "C",
              O: "74",
              P: "23",
              Total: "44",
              credits: "2",
            },
          ],
          gm: "2",
        })
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMzI0Njk1LCJleHAiOjE2MjU5MTY2OTV9.O2-ThpkBcBvCjJ82xfqGDxMrmNb65RCuTdzCG9QM1Yg"
        )
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res).toEqual(jasmine.any(Object));
          expect(res.body.message).toEqual("Grade Ranges not set");
          done();
        });
    });
  });
});

//     it("15CSE312 => B+ => Total => 54", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/new/grade/test2")
//         .send({
//           grace: [
//             {
//               O: "74",
//               A: "59",
//               Ap: "67",
//               B: "39",
//               Bp: "51",
//               C: "31",
//               P: "23",
//               CourseID: "15CSE201",
//               Grade: "A",
//               Total: "65",
//               credits: "4",
//             },
//             {
//               A: "66",
//               Ap: "75",
//               B: "44",
//               Bp: "57",
//               C: "35",
//               CourseID: "15CSE213",
//               Grade: "",
//               O: "82",
//               P: "26",
//               Total: "",
//               credits: "4",
//             },
//             {
//               A: "63",
//               Ap: "72",
//               B: "42",
//               Bp: "54",
//               C: "33",
//               CourseID: "15CSE312",
//               Grade: "B",
//               O: "78",
//               P: "25",
//               Total: "50",
//               credits: "3",
//             },
//             {
//               A: "66",
//               Ap: "75",
//               B: "44",
//               Bp: "57",
//               C: "35",
//               CourseID: "15CSE302",
//               Grade: "A",
//               O: "82",
//               P: "26",
//               Total: "73",
//               credits: "1",
//             },
//             {
//               A: "59",
//               Ap: "67",
//               B: "39",
//               Bp: "51",
//               C: "31",
//               CourseID: "15CSE313",
//               Grade: "C",
//               O: "74",
//               P: "23",
//               Total: "44",
//               credits: "2",
//             },
//           ],
//           gm: "4",
//         })
//         .set(
//           "Authorization",
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMzI0Njk1LCJleHAiOjE2MjU5MTY2OTV9.O2-ThpkBcBvCjJ82xfqGDxMrmNb65RCuTdzCG9QM1Yg"
//         )
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res.status).toBe(200);
//           expect(res).toEqual(jasmine.any(Object));
//           expect(res.body.Total).toEqual(54);
//           expect(res.body.Grade).toEqual("B+");
//           done();
//         });
//     });
