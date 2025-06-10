const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    leadName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    status: { type: String, enum: ["new", "follow-up", "converted", "lost"], default: "new" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nextFollowUpDate: { type: String },
    nextFollowUpTime: { type: String },
    leadSource: { type: String },
    conversionDate: { type: String },
    leadNotes: { type: String },
    customerType: { type: String }, // e.g. new/returning
    purchaseHistory: [{ type: String }],
    medicalNeeds: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
