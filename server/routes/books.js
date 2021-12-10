const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getBooks);
router.get("/:genre", controller.getBooksByGenre);
router.post("/", controller.addBook);

module.exports = router;
