const express = require("express");

const OrderComplaintController = require("./controllers/OrderComplaintController");

const routes = express.Router();

routes.get("/orderscomplaints", OrderComplaintController.index);
routes.get("/orderscomplaint/:orderId", OrderComplaintController.show);
routes.post("/orderscomplaint/add", OrderComplaintController.store);
routes.put("/orderscomplaint/update", OrderComplaintController.store);


module.exports = routes;