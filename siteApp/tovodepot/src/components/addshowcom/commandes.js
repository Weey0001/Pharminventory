import React, { Component } from 'react'
import "./commandes.css"

export default class Commande extends Component {

    render() {
        let {
            name,
            count,
            outPrice,
            totalPrice
        } = this.props.caracs

        return (
            <div className="item">


                <p className='table'>{name}</p>
                <p className='table'>{outPrice}</p>
                <p className='table'>{count}</p>
                <p className='table'>{totalPrice}</p>


            </div>
        )
    }
}
