import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../sevices/api"

export default function Details() {
    let { id } = useParams();
    const [complaint, setComplaint] = useState(id);
    
    useEffect(() => {
        async function loadComplaint() {
            const response = await api.get(`/orderscomplaint/${id}`);
            setComplaint(response.data);
        }
        loadComplaint();
    }, [id]);
    
    return (
        <div key={complaint._id}>
            <h1 className="text-center home">Detalhes da Reclamação - {id}</h1>
            <div className="container top-margin-30">

                {complaint.fraudCheckMessage !== "" && [
                    <div key={complaint._id}>
                        <div className="row">
                            <div className="col-sm-12">
                                <label htmlFor="fraudCheckMessage" className="font-bold">Mensagem de alerta: </label>
                                <input
                                    id="fraudCheckMessage"
                                    type="text"
                                    className="form-control"
                                    readOnly
                                    disabled="disabled"
                                    value={complaint.fraudCheckMessage}
                                />
                            </div>
                        </div>

                        <br></br>
                        <br></br>
                    </div>
                ]}

                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="name" className="font-bold">Nome: </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            readOnly
                            disabled="disabled"
                            value={complaint.name}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="email" className="font-bold">E-mail: </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            readOnly
                            disabled="disabled"
                            value={complaint.email}
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
                            readOnly
                            disabled="disabled"
                            value={complaint.phone}
                        />
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="zipCode" className="font-bold">CEP: </label>
                        <input
                            id="zipCode"
                            type="tel"
                            className="form-control"
                            readOnly
                            disabled="disabled"
                            value={complaint.deliveryZipCode}
                        />
                    </div>

                    <div className="col-sm-4">
                        <label htmlFor="phone" className="font-bold">Código do Pedido: </label>
                        <input
                            id="orderId"
                            type="text"
                            className="form-control"
                            readOnly
                            disabled="disabled"
                            value={complaint.orderId}
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
                            readOnly
                            disabled="disabled"
                            value={complaint.complaintDescription}
                        />
                    </div>
                </div>                
            </div>
        </div>
    );
}