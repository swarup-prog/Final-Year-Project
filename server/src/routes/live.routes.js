const {
  goLive,
  getLiveBuddies,
  endLive,
} = require("../controllers/live.controller");

const router = require("express").Router();

router.post("/go-live", goLive);
router.get("/get-live-buddies", getLiveBuddies);
router.delete("/end-live/:id", endLive);

module.exports = router;
