const requirementSchema = new mongoose.Schema(
  {
    requirementId: { type: String, required: true },
    source: String,
    type: { type: String, enum: ["FR", "NFR"] },
    description: String,
    category: String,
    priority: { type: String, enum: ["Must", "Should", "Could", "Won't"] },
    tags: [String],
    isDuplicate: { type: Boolean, default: false },
    notes: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Requirement", requirementSchema);
