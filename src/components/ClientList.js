import React from 'react'
import { useState } from 'react'
//import './ClientList.css'
import '../css/main.css'


function List (){

    const [clients, setClients] = useState ([])

    fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
    .then((data_raw) => data_raw.json())
    .then((clients) => {
        setClients(clients)
    })
    

    return <div>
        {clients.map((obj) => {
            return <div className="lineClients" key={obj.id} >
            <div className="imgClients">
              <img src={obj.img} className='perfil' alt="imgem do usuário"/>
            </div>
            <div className="idClients">
              <p> {obj.name}</p>
              <p> ID: {obj.id} - Username: {obj.username}</p>
            </div>
            <button className="btn">Pagar</button>
        </div>
        })}
    </div>
}

export default List