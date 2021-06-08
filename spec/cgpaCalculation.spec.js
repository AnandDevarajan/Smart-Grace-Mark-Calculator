// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const { expect } = chai;
// const BASE_URL = "http://127.0.0.1:5000";
// chai.use(chaiHttp);

// describe("CGPA Calculation", () => {
//   describe("boundary condition", () => {
//     it("{F,4},{F,4},{F,1},{F,3},{F,2} => CGPA = 4.00", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/cgpa/anand123")
//         .send({
//           marks: [
//             { Final_Grade: "F", Grade: "F", credits: "4" },
//             { Final_Grade: "F", Grade: "F", credits: "4" },
//             { Final_Grade: "F", Grade: "F", credits: "1" },
//             { Final_Grade: "F", Grade: "F", credits: "3" },
//             { Final_Grade: "F", Grade: "F", credits: "2" },
//           ],
//         })
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res).to.have.status(200);
//           expect(res).to.be.an("object");
//           expect(res.body.final_cgpa).to.equal("4.00");
//           done();
//         });
//     });
//     it("{O,4},{O,4},{O,1},{O,3},{O,2} => CGPA = 10.00", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/cgpa/anand123")
//         .send({
//           marks: [
//             { Final_Grade: "O", Grade: "O", credits: "4" },
//             { Final_Grade: "O", Grade: "O", credits: "4" },
//             { Final_Grade: "O", Grade: "O", credits: "1" },
//             { Final_Grade: "O", Grade: "O", credits: "3" },
//             { Final_Grade: "O", Grade: "O", credits: "2" },
//           ],
//         })
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res).to.have.status(200);
//           expect(res).to.be.an("object");
//           expect(res.body.final_cgpa).to.equal("10.00");
//           done();
//         });
//     });
//   });
//   describe("negative condition", () => {
//     it("{B+,0},{B,0},{A+,0},{A,0},{O,0} => CGPA = Invalid", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/cgpa/anand123")
//         .send({
//           marks: [
//             { Final_Grade: "B++", Grade: "B", credits: "0" },
//             { Final_Grade: "B", Grade: "B", credits: "0" },
//             { Final_Grade: "A+", Grade: "A+", credits: "0" },
//             { Final_Grade: "A", Grade: "A", credits: "0" },
//             { Final_Grade: "O", Grade: "O", credits: "0" },
//           ],
//         })
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equal("Unable to calculate cgpa now");
//           done();
//         });
//     });
//     it("{O,0},{O,0},{A+,0},{` `,0},{` `,0} => CGPA = Invalid", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/cgpa/anand123")
//         .send({
//           marks: [
//             { Final_Grade: "O", Grade: "O", credits: "4" },
//             { Final_Grade: "B+", Grade: "B+", credits: "4" },
//             { Final_Grade: "A+", Grade: "A+", credits: "2" },
//             { Final_Grade: " ", Grade: " ", credits: "1" },
//             { Final_Grade: " ", Grade: " ", credits: "3" },
//           ],
//         })
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res).to.have.status(400);
//           expect(res.body.message).to.equal("Unable to calculate cgpa now");
//           done();
//         });
//     });
//   });
//   describe("positive condition", () => {
//     it("{B+,4},{B,4},{A+,1},{A,3},{O,2} => CGPA = 8.32", (done) => {
//       chai
//         .request(BASE_URL)
//         .put("/student/caluclate/cgpa/anand123")
//         .send({
//           marks: [
//             { Final_Grade: "B+", Grade: "B", credits: "4" },
//             { Final_Grade: "B", Grade: "B", credits: "4" },
//             { Final_Grade: "A+", Grade: "A+", credits: "1" },
//             { Final_Grade: "A", Grade: "A", credits: "3" },
//             { Final_Grade: "O", Grade: "O", credits: "2" },
//           ],
//         })
//         .end((err, res) => {
//           if (err) done(err);
//           expect(res).to.have.status(200);
//           expect(res).to.be.an("object");
//           expect(res.body.final_cgpa).to.equal("8.32");
//           done();
//         });
//     });
//   });
// });
