const { app, server } = require("./app");
const request = require("supertest");
const mongoose = require("mongoose");
const dbConfig = require("../src/config/dbConfig");


// change the email either it will give error as user already exists
let email="st@gmail.com"

describe("User controller Test", () => {
  let mongo;
  beforeEach(async () => {
    mongo = await mongoose.connect(dbConfig.URL);
  }, 100000);
  afterAll((done) => {
    server.close();
    mongoose.connection.close();
    done();
  });
  describe("signup user", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/v1/signup").send({
        name: "shubham",
        email: email,
        password: "1234",
        confirm_password: "1234",
      });
      expect(response.statusCode).toBe(200);
    });
  });
  describe("login user", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: email,
        password: "1234",
      });
      expect(response.statusCode).toBe(200);
      token = response.body.token;
    }, 300000);
  });
});
describe("Notes controller Test", () => {
  let mongo;
  let token;
  let id;
  let keyword;
  beforeEach(async () => {
    mongo = await mongoose.connect(dbConfig.URL);
  }, 100000);
  afterAll((done) => {
    server.close();
    mongoose.connection.close();
    done();
  });

  describe("login user", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: email,
        password: "1234",
      });
      expect(response.statusCode).toBe(200);
      token = response.body.token;
    }, 300000);
  });
  describe("create note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post(`/api/v1/createNewNote`)
        .set("x-access-token", token)
        .send({
          title: "hello",
          description: "hello",
        });
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
  describe("get all notes", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .get("/api/v1/getNotes")
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
      id = response.body.data[0]._id;
      keyword = response.body.data[0].title;
    }, 300000);
  });
  describe("get single note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .get(`/api/v1/getNotes/${id}`)
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
  describe("update single note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .put(`/api/v1/updateNote/${id}`)
        .set("x-access-token", token)
        .send({
          title: "xxxyyx",
          description: "456123",
        });
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
  describe("search note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .get(`/api/v1/search?keyword=${keyword}`)
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
  describe("share note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .post(`/api/v1/share/${id}`)
        .set("x-access-token", token)
        .send({
          email: "ab@gmail.com",
        });
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
  describe("delete single note", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app)
        .delete(`/api/v1/deleteNote/${id}`)
        .set("x-access-token", token);
      expect(response.statusCode).toBe(200);
    }, 300000);
  });
});
