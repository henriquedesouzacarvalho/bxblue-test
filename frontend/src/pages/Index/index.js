import React from 'react';
import logo from '../../assets/reclamacao.png'

export default function Index() {
    return (
        <>
            <h1 className="text-center home">Bem vindo ao Reclamador</h1>
            <div className="logo">
                <img src={logo} alt="Logo"></img>
            </div>
        </>
    );
}