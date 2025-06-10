const Lead = require("../models/Lead");

// Create Lead
exports.createLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const savedLead = await lead.save();
        res.status(201).json(savedLead);
    } catch (err) {
        res.status(400).json({ message: "Lead creation failed", error: err.message });
    }
};

// Get All Leads (with filters, sort, search, pagination)
exports.getLeads = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, assignedTo, leadSource, search, sortBy = "createdAt", sortOrder = "desc" } = req.query;

        let query = {};

        if (status) query.status = status;
        if (assignedTo) query.assignedTo = assignedTo;
        if (leadSource) query.leadSource = leadSource;
        if (search) {
            query.$or = [
                { leadName: new RegExp(search, "i") },
                { contactNumber: new RegExp(search, "i") },
                { email: new RegExp(search, "i") }
            ];
        }

        const leads = await Lead.find(query)
            .populate("assignedTo", "name email")
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Lead.countDocuments(query);
        res.json({ leads, total, page: Number(page), totalPages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch leads", error: err.message });
    }
};

// Get Single Lead
exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate("assignedTo", "name email");
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead);
    } catch (err) {
        res.status(400).json({ message: "Invalid lead ID", error: err.message });
    }
};

// Update Lead
exports.updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead);
    } catch (err) {
        res.status(400).json({ message: "Lead update failed", error: err.message });
    }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json({ message: "Lead deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Lead delete failed", error: err.message });
    }
};
