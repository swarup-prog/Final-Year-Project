const { postNews, getNews } = require("../controllers/news.controller");
const router = require("express").Router();

router.route("/get").get(getNews);
router.route("/publish").post(postNews);

module.exports = router;