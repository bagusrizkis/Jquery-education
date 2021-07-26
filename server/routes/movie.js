const router = require("express").Router();
const movieController = require("../controllers/movie");

router.get("/", movieController.findAll);
router.get("/:id", movieController.findOne);
router.post("/", movieController.create);

module.exports = router;
