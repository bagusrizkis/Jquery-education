const router = require("express").Router();
const userRouter = require("./user");
const movieRouter = require("./movie");
const { authentication } = require("../middlewares/authentication");
const MovieController = require("../controllers/movie");

router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to movie app" });
});

router.use("/users", userRouter);
router.get("/movies/popular", MovieController.getPopular);
router.use(authentication);
router.use("/movies", movieRouter);

module.exports = router;
