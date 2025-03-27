import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endDate: { type: String, required: true },
  endTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // 🟢 Expiry Field
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }, 
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
