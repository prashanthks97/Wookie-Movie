const express = require("express");
const router = express.Router();
const userController = require("../Controller/controller");
const { protected } = require("../Middleware/ProtectedRoutes");

router.post("/user/create", userController.create);

router.post("/user/login", userController.login);

router.get("/user/home", protected, userController.home);

router.get("/user/movie/:id", protected, userController.movie);

router.get("/user/search/:searchterm", protected, userController.search);

module.exports = router;
