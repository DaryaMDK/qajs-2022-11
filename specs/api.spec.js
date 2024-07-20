import axios from "axios";

const baseUrl = "https://bookstore.demoqa.com";

//Создание пользователя успешно
axios
  .post(baseUrl + "/Account/v1/User", {
    userName: "daria",
    password: "Test123*334",
  })
  .then(function (response) {
    console.log(response.status == 201);
  })
  .catch(function (error) {
    console.log(error);
  });

//Создание пользователя c ошибкой, логин уже используется
axios
  .post(baseUrl + "/Account/v1/User", {
    userName: "daria",
    password: "Test123*334",
  })
  .then(function (response) {
    console.log(response.message == "User exists!");
  })
  .catch(function (error) {
    console.log(error);
  });

//Создание пользователя c ошибкой, пароль не подходит
axios
  .post(baseUrl + "/Account/v1/User", {
    userName: "daria",
    password: "12345",
  })
  .then(function (response) {
    console.log((response.status = 400));
  })
  .catch(function (error) {
    console.log(error);
  });

//Генерация токена успешно
axios
  .post(baseUrl + "/Account/AccountV1UserPost", {
    userName: "daria",
    password: "Test123*334",
  })
  .then(function (response) {
    console.log((response.status = 200));
    console.log(
      "Content-Type:",
      response.headers["application/json; charset=utf-8 "],
    );
  })
  .catch(function (error) {
    console.log(error);
  });

//Генерация токена c ошибкой
axios
  .post(baseUrl + "/Account/AccountV1UserPost", {
    userName: "daria",
    password: "Test123*334",
  })
  .then(function (response) {
    console.log((response.status = 200));
    console.log(
      "Content-Type:",
      response.data ==
        {
          token: null,
          expires: null,
          status: "Failed",
          result: "User authorization failed.",
        },
    );
  })
  .catch(function (error) {
    console.log(error);
  });
