const express = require("express");
const { addToCollection, getUserCollection } = require("../controllers/collectionController");
const router = express.Router();

router.post("/add", addToCollection);  // POST /api/collection/add
router.get("/", getUserCollection);   // GET /api/collection?user_id=X&status=Y

module.exports = router;