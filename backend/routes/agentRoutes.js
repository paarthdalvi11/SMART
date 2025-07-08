const express = require("express");
const router = express.Router();
const { createAgentOutput, getAgentOutputs, getAgentOutputById } = require("../controllers/agentOutputController");
const { authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", authorizeRoles("admin", "agent"), createAgentOutput);
router.get("/", getAgentOutputs);
router.get("/:id", getAgentOutputById);

module.exports = router;