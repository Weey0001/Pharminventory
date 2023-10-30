import React, { Component } from 'react'
import "./additem.css"
import axios from "axios"

const urlServer = "http://localhost:5000/items";

export default class AddItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isChecked:false,
        }

        this.grossiste = React.createRef();
        this.name = React.createRef();
        this.inPrice = React.createRef();
        this.marge = React.createRef();
        this.count = React.createRef();
        this.facture = React.createRef();
    }



    checkbox = () => {
        let {isChecked}=this.state;
       this.setState({
           isChecked:!isChecked
       })
    }

    onclick = async () => {
        let {
            isChecked
        } = this.state,
        item = {
            grossiste:this.grossiste.current.value,
            facture:this.facture.current.value,
            name:this.name.current.value,
            inPrice:this.inPrice.current.value,
            marge:this.marge.current.value,
            tva:isChecked,
            count:this.count.current.value
        },
        {
            grossiste,
            name,
            inPrice,
            marge,
            count,
            facture

        } = item;

        if(grossiste===""||facture===""||name===""||inPrice===""||marge===""||count===""){
           alert("Misy Diso ben a ))")
        }else{

        try {
            await 
              axios.post(urlServer+"/add",item)
                .then(_=>{
                    this.props.updatestate(true)
                })
                .then(_=>{
                    this.name.current.value="";
                    this.inPrice.current.value='';
                    this.marge.current.value='';
                    this.count.current.value='';
                    this.setState({
                        isChecked:false
                    })
                })
                .catch(err=>alert(err))
            } catch (error) {
                alert(error)
            }
        }
    }

    render() {

        let {isChecked} = this.state;

        return (
            <div className="AddItems">
                
                <input
                    placeholder="Grossiste"
                    type="text"
                    ref={this.grossiste}
                />
                <input
                    placeholder="Numero de facture"
                    type="text"
                    ref={this.facture}
                />
                <input
                    placeholder="Name"
                    type="text"
                    ref={this.name}
                />
                <input
                    placeholder="PrixEntrer"
                    type="number"
                    ref={this.inPrice}
                />
                <input
                    placeholder="Marge"
                    type="number"
                    ref={this.marge}
                />
                <div className="checkbox">
                    <label>Tva</label>
                    <input
                        type="checkbox" 
                        checked={isChecked}
                        onChange={this.checkbox}
                    />
                    
                </div>
                <input
                    placeholder="count"
                    type="number"
                    ref={this.count}
                />

                <input
                    type="button" 
                    onClick={this.onclick}
                    value="addItem"
                />
            </div>
        )
    }
}
