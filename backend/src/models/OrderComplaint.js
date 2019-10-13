const mongoose = require("mongoose");

const OrderComplaintSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    orderId: Number,
    deliveryZipCode: String,
    complaintDescription: String,
    complainantIP: String
});

module.exports = mongoose.model("OrderComplaint", OrderComplaintSchema);

