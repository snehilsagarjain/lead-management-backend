const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} = require("../controllers/leadController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest");

router.use(authMiddleware); // protect all lead routes

router.get("/", getLeads);

// router.post("/", createLead);
router.post(
    "/",
    [
        body("leadName").notEmpty().withMessage("Lead name is required"),
        body("contactNumber").notEmpty().withMessage("Contact number is required"),
    ],
    validateRequest,
    createLead
);

router.get("/:id", getLeadById);
router.put("/:id", updateLead);

// router.delete("/:id", deleteLead);
router.delete("/:id", roleMiddleware(["admin"]), deleteLead);

module.exports = router;

