const router = require("express").Router();
const movieController = require("../controllers/movie");
const { authorization } = require("../middlewares/authorization");

router.get("/", movieController.findAll);
router.get("/:id", movieController.findOne);
router.post("/", movieController.create);
router.put("/:id", authorization, movieController.edit);
router.delete("/:id", authorization, movieController.delete);

module.exports = router;
