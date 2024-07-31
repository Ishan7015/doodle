import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    priority: {
        type: String,
        default: "Urgent",
        required: [true, "Please provide a Priority level"]
    },
    issudDate: {
        type: Date,
        default: new Date(),
    },
    dueDate: {
        type: Date,
    },
    assignedTo: {
        type: String,
        default: "Unassigned"
    }
})

const Tickets = mongoose.models.tickets || mongoose.model("tickets", ticketSchema);

export default Tickets;