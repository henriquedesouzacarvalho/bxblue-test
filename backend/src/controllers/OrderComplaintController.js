const OrderComplaint = require("../models/OrderComplaint");
const configs = require("../configs/Config");
const serviceRequest = require("../services/ServicesRequest");

async function getZipCodeFromIp(ip) {
    let url = configs.ipgeolocationUri.replace("{ip}", ip), responseData;

    await serviceRequest.performGet(url)
    .then((response)=>{
        responseData = response;
    }, (error) => {
        throw error;
    });

    if (responseData.body.indexOf("zipcode") > -1) {
        return JSON.parse(responseData.body).zipcode.replace("-", "");
    } else {
        return "00000000";
    }
}

async function checkForPossibleFraud(origin, destination) {
    var url = configs.googleApiUri.replace("{origin}", origin).replace("{destination}", destination), responseData, distanceInfo, responseMessage;
    await serviceRequest.performGet(url)
    .then((response)=>{
        responseData = response;
    }, (error) => {
        throw error;
    });

    distanceInfo = JSON.parse(responseData.body);
    if (distanceInfo.rows[0].elements[0].status == "OK") {
        let distanceInMeters = distanceInfo.rows[0].elements.value;
        console.log(distanceInMeters);
        if (distanceInMeters > 10000) {
            responseMessage = "Possível fraude, CEP do endereço de entrega a mais de 10 kms do CEP do endereço da reclamação.";
        } else {
            responseMessage = "";
        }
    } else {
        responseMessage = "Possível fraude, não foi possível validar o CEP pelo IP.";
    }
    return responseMessage;
}

module.exports =  {
    async index(req, res) {
        const orderComplaintData = await OrderComplaint.find();
        res.json(orderComplaintData);
    },
    async store(req, res) {
        const { name, email, phone, orderId, deliveryZipCode, complaintDescription, complainantIP } = req.body;

        let orderComplaint = await OrderComplaint.findOne({ orderId });
        if (!orderComplaint) {
            orderComplaint = await OrderComplaint.create({
                name, email, phone, orderId, deliveryZipCode, complaintDescription, complainantIP
            });
        } else {
            let newValues = {
                $set:{
                    name, email, phone, orderId, deliveryZipCode, complaintDescription, complainantIP
                }
            };
            await OrderComplaint.updateOne({ orderId }, newValues);
            orderComplaint = await OrderComplaint.findOne({ orderId });
        }

        res.json(orderComplaint);
    },
    async show(req, res) {
        let { orderId } = req.params;
        orderId = parseFloat(orderId);
        const orderComplaintData = await OrderComplaint.findOne({ orderId });

        let zipCodeFromIP = await getZipCodeFromIp(orderComplaintData.complainantIP);

        let fraudCheckMessage = await checkForPossibleFraud(orderComplaintData.deliveryZipCode, zipCodeFromIP);

        let complainantData = orderComplaintData.toObject();
        complainantData.fraudCheckMessage = fraudCheckMessage;

        res.json(complainantData)
    }
};