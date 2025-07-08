const documentSchema = new mongoose.Schema(
  {
    documentId: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalFileName: String,
    storedFilePath: String,
    fileType: String,
    uploadDate: { type: Date, default: Date.now },
    agentOutputId: String,
    status: { type: String, default: 'uploaded' },
    finalJsonPath: String,
    finalDocxPath: String,
    versionHistory: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
