const router = require("express").Router();
const userRouter = require("./user");
const movieRouter = require("./movie");
const { authentication } = require("../middlewares/authentication");

router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to movie app" });
});

router.use("/users", userRouter);
router.use(authentication);
router.use("/movies", movieRouter);

module.exports = router;
