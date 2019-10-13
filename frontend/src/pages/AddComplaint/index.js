import React, { useState } from 'react';
import api from '../../sevices/api'
import './index.css';
import '../../App.css';

const ipApi = require("../../config/config");

//Nome, Email, Telefone, Número do pedido, Cep da entrega e descrição do ocorrido
export default function AddComplaint({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [orderId, setOrderId] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [complaintDescription, setComplaintDescription] = useState("");

    async function getUserIp() {
        return new Promise((resolve, reject) => {
            fetch(ipApi.ipgeolocationUri, {
                crossDomain: true,
                method: "GET",
                headers: { "Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(res => {
                return resolve(res.ip);
            })
            .catch(error => {
                alert("Erro ao realizar a gravação dos dados.");
                return reject(error);
            });
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let ip = await getUserIp();
        let complaint = {
            "name": name,
            "email": email,
            "phone": phone,
            "orderId": orderId,
            "deliveryZipCode": zipCode,
            "complaintDescription": complaintDescription,
            "complainantIP": ip
        };

        const response = await api.post("/orderscomplaint/add", complaint);
        if (response.status === 200) {
            alert("Reclamação enviada com sucesso!");
        } else {
            alert("Erro ao enviar a solicitação. Por favor, entre e contato com o nosso SAC");
        }
        history.push("/");
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="text-center home">Cadastre sua Reclamação</h1>
                <div className="container top-margin-30">
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="name" className="font-bold">Nome: </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Digite seu nome"
                                maxLength="70"
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="email" className="font-bold">E-mail: </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Digite seu email"
                                maxLength="70"
                                required
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-4">
                            <label htmlFor="phone" className="font-bold">Telefone: </label>
                            <input
                                id="phone"
                                type="tel"
                                className="form-control"
                                placeholder="Digite seu telefone com o DDD, somente os números"
                                pattern="[0-9]{10,11}"
                                maxLength="11"
                                required
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                            />
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="zipCode" className="font-bold">CEP: </label>
                            <input
                                id="zipCode"
                                type="tel"
                                className="form-control"
                                placeholder="Digite seu CEP, somente os números"
                                pattern="[0-9]{8}"
                                maxLength="8"
                                required
                                value={zipCode}
                                onChange={event => setZipCode(event.target.value)}
                            />
                        </div>

                        <div className="col-sm-4">
                            <label htmlFor="phone" className="font-bold">Código do Pedido: </label>
                            <input
                                id="orderId"
                                type="text"
                                className="form-control"
                                placeholder="Digite o código do pedido"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                required
                                value={orderId}
                                onChange={event => setOrderId(event.target.value)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-12">
                            <label htmlFor="name" className="font-bold">Reclamação: </label>
                            <textarea
                                id="complaintDescription"
                                type="text"
                                className="form-control"
                                placeholder="Digite sua reclamação"
                                maxLength="512"
                                rows="10"
                                cols="60"
                                required
                                value={complaintDescription}
                                onChange={event => setComplaintDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2">
                        <button className="btn btn-success" type="submit">Cadastrar reclamação</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}