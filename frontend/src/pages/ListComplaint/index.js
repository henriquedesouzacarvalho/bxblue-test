import React, { useEffect, useState } from 'react';
import api from "../../sevices/api"
import '../../App.css';

export default function ListComplaint() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        async function loadComplaints() {
            const response = await api.get("/orderscomplaints");
            setComplaints(response.data);
        }
        loadComplaints();
    }, []);
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <table className="table top-margin-30">
                        <thead>
                            <tr>
                                <th scope="col">Pedido</th>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Mais detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map(complaint => (
                                <tr key={complaint._id}>
                                    <th scope="row">{complaint.orderId}</th>
                                    <td>{complaint.name}</td>
                                    <td>{complaint.email}</td>
                                    <td>{complaint.deliveryZipCode}</td>
                                    <td>
                                        <a href={`/complaint-detail/${complaint.orderId}`}>Mais detalhes...</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}