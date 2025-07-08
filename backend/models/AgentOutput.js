const agentOutputSchema = new mongoose.Schema(
  {
    agentOutputId: { type: String, required: true },
    documentId: { type: String, required: true },
    agentType: String,
    extractedRequirements: [mongoose.Schema.Types.Mixed],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AgentOutput', agentOutputSchema);