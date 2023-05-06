const { companies, employees } = require("./build/databases/schema");

const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("./build/server");
const { describe } = require("mocha");

chai.use(chaiHttp);
chai.should();

//response
const responseTest = (res, statusCode = 200, messsage = "Success") => {
  res.should.have.status(statusCode);
  res.body.should.have.a("object");
  res.body.should.have.property("status").eql(statusCode);
  res.body.should.have.property("code").eql(statusCode.toString());
  res.body.should.have.property("data");
  res.body.should.have.property("message").eql(messsage);
};

const updateDatabase = async () => {
  await employees.deleteMany();
  await companies.deleteMany();
};

var idCompanies;
var idEmployees;
const test = async () => {
  describe("Test", () => {
    before((done) => {
      updateDatabase().then(() => {
        server.then(done());
      });
    });

    after(async (done) => {
      done();
    });

    //Test route all companies
    describe("Companies", () => {
      it("1. it get all companies if not found", (done) => {
        chai
          .request(server)
          .get("/api/companies")
          .end((err, res) => {
            responseTest(res, 422, "Data is not found");
            done();
          });
      });
      it("2. it create a new companies success", (done) => {
        chai
          .request(server)
          .post("/api/companies")
          .send({
            company_name: "t98e",
            telephone_number: "081738282688",
            address: "dwdhwidhiwhdiwd",
          })
          .end((err, res) => {
            responseTest(res, 201, "Success");
            done();
          });
      });
      it("3. it invalid request send", (done) => {
        chai
          .request(server)
          .post("/api/companies")
          .send({
            telephone_number: "081738282688",
            address: "dwdhwidhiwhdiwd",
          })
          .end((err, res) => {
            responseTest(res, 400, "company_name is required");
            done();
          });
      });
      it("4. it conflict request in companies create", (done) => {
        chai
          .request(server)
          .post("/api/companies")
          .send({
            company_name: "t98e",
            telephone_number: "081738282688",
            address: "dwdhwidhiwhdiwd",
          })
          .end((err, res) => {
            responseTest(res, 409, "Company Name already exist");
            done();
          });
      });
      it("5. it get all companies success", (done) => {
        chai
          .request(server)
          .get("/api/companies")
          .end((err, res) => {
            responseTest(res, 200, "Success");
            done();
          });
      });
      it("6. it update is_active companies", (done) => {
        //build new companies
        companies
          .create({
            company_name: "paijo",
            telephone_number: "wbdwuduwbdd",
            address: "wbdwuduwbdd",
          })
          .then((res) => {
            idCompanies = res.id;
            chai
              .request(server)
              .put(`/api/companies/${res.id}/set_active`)
              .end((err, res) => {
                responseTest(res, 201, "Success");
                done();
              });
          });
      });
      it("7. it update is_active companies but not found", (done) => {
        chai
          .request(server)
          .put(`/api/companies/64564fc584c2eec3302dbae4/set_active`)
          .end((err, res) => {
            responseTest(res, 422, "Data is not found");
            done();
          });
      });
      it("8. it update is_active companies but already activate is true", (done) => {
        chai
          .request(server)
          .put(`/api/companies/${idCompanies}/set_active`)
          .end((err, res) => {
            responseTest(res, 400, "Company is already active");
            done();
          });
      });
    });

    //Test route all Employee
    describe("Employees", () => {
      it("1. it get employee but not found", (done) => {
        chai
          .request(server)
          .get(`/api/employees/64564fc584c2eec3302dbae4`)
          .end((err, res) => {
            responseTest(res, 422, "Data is not found");
            done();
          });
      });
      it("2. it get all Employee from companies but not found", (done) => {
        chai
          .request(server)
          .get(`/api/companies/64564fc584c2eec3302dbae4/employees`)
          .end((err, res) => {
            responseTest(res, 422, "Data is not found");
            done();
          });
      });
      it("3. it create a new employee", (done) => {
        chai
          .request(server)
          .post(`/api/companies/${idCompanies}/employees`)
          .send({
            name: "paijo",
            email: "buka@email.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .end((err, res) => {
            responseTest(res, 201, "Success");
            idEmployees = res.body.data.id;
            done();
          });
      });
      it("4. it invalid Request to create", (done) => {
        chai
          .request(server)
          .post(`/api/companies/${idCompanies}/employees`)
          .send({
            email: "buka@email.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .end((err, res) => {
            responseTest(res, 400, "name is required");

            done();
          });
      });
      it("5. it conflict data to create", (done) => {
        chai
          .request(server)
          .post(`/api/companies/${idCompanies}/employees`)
          .send({
            name: "superr",
            email: "buka@email.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .end((err, res) => {
            responseTest(res, 409, "Email already exist");
            done();
          });
      });
      it("6. it update data a employees", (done) => {
        chai
          .request(server)
          .put(`/api/companies/${idCompanies}/employees/${idEmployees}`)
          .send({
            name: "satria",
            email: "buka@email.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .end((err, res) => {
            responseTest(res, 201, "Success");
            done();
          });
      });
      it("7. it update but invalid request employes", (done) => {
        chai
          .request(server)
          .put(`/api/companies/${idCompanies}/employees/${idEmployees}`)
          .send({
            email: "buka@email.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .end((err, res) => {
            responseTest(res, 400, "name is required");
            done();
          });
      });
      it("8. it update but conflict employees", (done) => {
        //build new employee
        employees
          .create({
            name: "hahaha",
            email: "haduuuu@com.com",
            phone_number: "28020284028",
            jobtitle: "staff",
          })
          .then((res) => {
            chai
              .request(server)
              .put(`/api/companies/${idCompanies}/employees/${res.id}`)
              .send({
                name: "okee",
                email: "buka@email.com",
                phone_number: "28020284028",
                jobtitle: "staff",
              })
              .end((err, res) => {
                responseTest(res, 409, "Email already exist");
                done();
              });
          });
      });
      it("9. it get employee", (done) => {
        chai
          .request(server)
          .get(`/api/employees/${idEmployees}`)
          .end((err, res) => {
            responseTest(res, 200, "Success");
            done();
          });
      });
      it("10. it get all Employee from companies", (done) => {
        chai
          .request(server)
          .get(`/api/companies/${idCompanies}/employees`)
          .end((err, res) => {
            responseTest(res, 200, "Success");
            done();
          });
      });
      it("11. it delete employee", (done) => {
        chai
          .request(server)
          .delete(`/api/employees/${idEmployees}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });

    //test route all tasks
    describe("Tasks", () => {
      it("1. it Fibonacci", (done) => {
        chai
          .request(server)
          .post(`/api/fibonacci`)
          .send({ n: 10 })
          .end((err, res) => {
            responseTest(res, 200, "Success");
            done();
          });
      });
      it("2. it Fibonacci but invalid Request", (done) => {
        chai
          .request(server)
          .post(`/api/fibonacci`)
          .send()
          .end((err, res) => {
            responseTest(res, 400, "n is required");
            done();
          });
      });
      it("3. it combination", (done) => {
        chai
          .request(server)
          .post(`/api/combination`)
          .send({ n: 4, r: 2 })
          .end((err, res) => {
            responseTest(res, 200, "Success");
            done();
          });
      });
      it("4. it combination but invalid Request", (done) => {
        chai
          .request(server)
          .post(`/api/combination`)
          .send()
          .end((err, res) => {
            responseTest(res, 400, "n or r is required");
            done();
          });
      });
    });
  });
};
test();
