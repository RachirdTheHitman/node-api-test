const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  firstname: "richard",
  lastname: "zhang",
  paydate: "06 November 2019",
  payfreq: "monthly",
  annualsalary: 70000,
  grossIncome: 5833,
  incomeTax: 1192,
  netIncome: 4641,
  super: 524,
  pay: 4117
};

//delete all the user documents in Mongodb to setup the testing environment
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

//create a new payslip for a payee
test("Should create a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      firstname: "john",
      lastname: "smith",
      paydate: "06 November 2019",
      payfreq: "monthly",
      annualsalary: 80000,
      grossIncome: 6666,
      incomeTax: 1463,
      netIncome: 5203,
      super: 599,
      pay: 4604
    })
    .expect(201);
});

// test when trying to pay a same person twice
test("Should fail the test and receive 400 bad quest when trying creating a same user, meaning who's been paid already", async () => {
  await request(app)
    .post("/users")
    .send({
      firstname: "richard",
      lastname: "zhang",
      paydate: "06 November 2019",
      payfreq: "monthly",
      annualsalary: 70000,
      grossIncome: 5833,
      incomeTax: 1192,
      netIncome: 4641,
      super: 524,
      pay: 4117
    })
    .expect(400);
});

//Retrieving all the users documents existed in the users collection
test("Should retrieve all the user documents in users collection", async () => {
  await request(app)
    .get("/users")
    .expect(200);
});
