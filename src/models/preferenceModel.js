import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, "Please provide a user id to map the settings with the user"]
  },
  wallpaper: {
    type: [Number],
    default: [1],
  },
  iconTheme: {
    type: [Number],
    default: [1]
  }
})

const Preference = mongoose.models.tickets || mongoose.model("preferences", preferenceSchema);

export default Preference;