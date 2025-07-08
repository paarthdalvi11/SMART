
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorizeRoles } = require("../middleware/authMiddleware");

router.post('/register', setUser);
router.post('/login', loginUser);
router.post('/logout', checkAuth, logoutUser);
router.get('/getUser', checkAuth, getUser); 
router.get("/admin/all", authorizeRoles("admin"), async (req, res) => {
  const users = await require("../models/User").find();
  res.json(users);
});

module.exports = router;