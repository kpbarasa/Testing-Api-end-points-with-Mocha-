const chai = require('chai');
const chaiHttp = require('chai-http');
const { connection, default: mongoose } = require('mongoose');
const server = require('../server.js');
const assert = require('assert');

const data = require('../data.model');

chai.should();
chai.use(chaiHttp);

describe("Get/", () => {

  it("/:id should respond with a 200 status code", async () => {
    chai.request(server)
      .get("/id")
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a("object")
        response.body.should.have.property('userId')
        response.body.should.have.property('userTitle')
        response.body.should.have.property('userNo')
      })
  })

  it("/ should respond with a 200 status code", async () => {
    chai.request(server)
      .get("/")
      .end((err, response) => {
        response.should.have.status(200)
      })
  })

})

describe("POST/", () => {
  it("/ should respond with a 200 status code", async () => {
    chai.request(server)
      .post("/")
      .send({
        id: "username",
        tittle: "password"
      })
      .end((err, response) => {
        response.should.have.status(200)
      })
  })
})

describe("Mongo DB CRUD Operations /", () => {

  it('URL: /Update data', async() => {
    const task = {
      id:"44444444",
      tittle:"rrrrrrrr"
    }
    await chai.request(server)
      .post("/update/data")
      .send(task)
      .end((err, response) => {
        
        response.should.have.status(201)

      })

  });

  it('URL: /find data', async() => {
    await chai.request(server)
      .get("/find/data")
      .end((err, response) => {
        response.should.have.status(201)
        response.body.should.be.a("object")
        response.body.should.have.property('results')
      })

  });

  it('fIND a New data', (done) => {

    data.find(done())
    .then((user) => {
        assert(user.tittle === 'WWWWWWWWWWWWW');
        done();
    });

  });

  it('Creates New data', (done) => {

    chai.request(server)
      .post("/new")
      .send({
        id: "username",
        tittle: "password"
      })

    const newData = new data({ "id": "QQQQQQQQQQQ", "tittle": "WWWWWWWWWWWWW" });

    newData.save(done())

  });

  it("/update Data", (done) => {

    data.findById("62a643e21cb63f3ea1b10b3b")
      .then(
        updateData => {
          updateData.id = "33333333333333";
          updateData.tittle = "222222222222";

          updateData.save()
        }, done())

    // data.findOne({ _id: "62a643e21cb63f3ea1b10b3b" }, function (err, getUser) {


    // }, done())

  })

  it('Delete data', (done) => {

    data.findByIdAndDelete("62a643e21cb63f3ea1b10b3b", done())

    // data.find({ id: "QQQQQQQQQQQ" }, function (err, getUser) {

    //   data.findByIdAndDelete(getUser._id)

    // }, done())

  });

})