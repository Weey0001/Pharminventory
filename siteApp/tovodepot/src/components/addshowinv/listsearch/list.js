import React, { Component } from 'react'
import axios from "axios"
import "./list.css"
const url = "http://localhost:5000/items";

export default class List extends Component {

    constructor(props){
        super(props)

        this.state = {
            inventaire:[],
        }
    }

    async componentDidMount(){

        try {
          await axios.get(url)
             .then(result=>{
                 this.setState({
                     inventaire:result.data,
                 })
             })
             .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidUpdate(){
        let {isupdate} = this.props
        if(isupdate){
            try {
                await axios.get(url)
                   .then(result=>{
                       this.setState({
                           inventaire:result.data,
                       })
                       this.props.updatestate(false)
                   })
                   .catch(err=>console.log(err))
              } catch (error) {
                  console.log(error)
              }
        }
    }

    onremove = async (id) =>{
        let idremove = {
            _id:id
        };

        try {
            await axios.post(url+"/remove",idremove)
              .then(result=>{
                  alert(result.data)
                  this.props.updatestate(true)
              })
              .catch(err=>alert(err))
        } catch (error) {
            alert(error)
        }
        
    }

    render() {

        let {inventaire}=this.state;

        return (
            <div className="list">
                <div className="item">
                    <p className='table'>nfacture</p>
                    <p className='table'>grossiste</p>
                    <p className='table'>name</p>
                    <p className='table'>inPrice</p>
                    <p className='table'>marge</p>
                    <p className='table'>count</p>
                    <p className='table'>tva</p>
                    <p className='table'>outPrice</p>
                    <p className='table'>state</p>
                </div>
                {
                    (JSON.stringify(inventaire)==="[]")? 
                    "noItems"
                    :(inventaire.map(ele=>(
                        <Item 
                          key={ele._id}
                          data={ele}
                          onremove={this.onremove}
                        />
                    )))}
            </div>
        )
    }
}


const Item = (props) =>{
    let {
        _id,
        facture,
        grossiste,
        name,
        inPrice,
        marge,
        count,
        tva,
        outPrice
    } = props.data;
  return (
    <div className="item">
       <p className='table'>{facture}</p>
       <p className='table'>{grossiste}</p>
       <p className='table'>{name}</p>
       <p className='table'>{inPrice}</p>
       <p className='table'>{marge}</p>
       <p className='table'>{count}</p>
       <p className='table'>{tva? "true":"false"}</p>
       <p className='table'>{outPrice}</p>
       <button 
         className="btnadditem"
         onClick={()=>props.onremove(_id)}
       >X</button>
    </div>
  )
}