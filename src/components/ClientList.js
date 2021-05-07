import React, { useEffect } from 'react'
import { useState } from 'react'
import '../css/main.css'


function List (){

    const [clients, setClients] = useState ([])
    const [showModal, setShowModal] = useState (["none"])
    const [nameClients, setNameClients] = useState({})
    const cards = [
      // valid card
      {
          id: 0,
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
      },
      // invalid card
      {
          id: 1,
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
      },
  ];

    //--------------- Puxando API
    useEffect(()  => {
      fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
      .then((data_raw) => data_raw.json())
     .then((clients) => {
        setClients(clients)
      })
     },[])

     //setando nome da lista no onclick
    const btnPagar = (obj) => {
      setNameClients(obj)
    }


    function validateForm() {
      const inputValuePayment = document.getElementById('valuePayment');
      const valueInputEmpty = document.getElementById('PaymentModalError')
      if (inputValuePayment.value === "") {
          valueInputEmpty.style.display = 'block';
          inputValuePayment.style.border = '1px solid red';
      } else {
          valueInputEmpty.style.display = 'none';
          inputValuePayment.style.border = '1px solid gray';
      }
  }

  
    return <div>
      {/* ---------Lista puxando da api */}
        {clients.map((obj) => {
            return <div className="lineClients" id="lineClients" key={obj.id} >
            <div className="imgClients">
              <img src={obj.img} className='perfil' alt="imgem do usuário"/>
            </div>
            <div className="idClients">
              <p> {obj.name}</p>
              <p> ID: {obj.id} - Username: {obj.username}</p>
            </div>
            <button className="btn" onClick={(e) =>{
                btnPagar(obj)
                setShowModal ("block")
            }}>Pagar</button>
        </div>
        })}
        {/* -------------Modal payment */}
        <div className="modal" style={{display:showModal}}>
          <div className="modalName">
            <p>Pagamento para <span>{nameClients.name}</span></p> <button onClick={() => {setShowModal("none") }}>X</button>
          </div>
          <div className="modalPayment">
          <input type="text" placeholder="R$ 0,00" onChange={(e) => e.target.value = maskValue(e.target.value)} maxLength="30" id="valuePayment" autoComplete="off"></input>
          <p className="PaymentModalError"  id="PaymentModalError">Preencha este campo!</p>
          <select className="selectedCard" id="selectedCard">
            {cards.map(
              card => (
                <option value={card.id} key={card.id}>
                 Cartão com o final {card.card_number.substr(-4)}
                </option>
              )
            )}
          </select>
          <button onClick={validateForm} className="btnPayment" id="btnPayment">Pagar</button>
          </div>
        </div>
    </div>
}


//----------Mascara de valor 
function maskValue(inputValue) {
  inputValue = parseInt(inputValue.replace(/\D/g, '')).toString();
  let valueFormatted = '';
  if (inputValue === '0' || inputValue === 'NaN') {
      valueFormatted = '';
  } else if (inputValue.length === 1) {
      valueFormatted += '00' + inputValue;
  } else if (inputValue.length === 2) {
      valueFormatted += '0' + inputValue;
  } else {
      valueFormatted = inputValue;
  }
  if (valueFormatted.length > 0) {
      const lastTwo = valueFormatted.substr(-2);
      valueFormatted = valueFormatted.substr(0, valueFormatted.length - 2) + ',' + lastTwo;
      let integerNumber = valueFormatted.substr(0, valueFormatted.indexOf(','));
      let indexDot = integerNumber.length - 3;
      while (indexDot > 0) {
          const initialPart = integerNumber.substr(indexDot, integerNumber.length);
          const finalPart = integerNumber.substr(0, indexDot);
          integerNumber = finalPart + '.' + initialPart;
          valueFormatted = integerNumber + ',' + lastTwo;
          indexDot -= 3;
      }
      valueFormatted = 'R$ ' + valueFormatted;
  }
  return valueFormatted;
}
export default List