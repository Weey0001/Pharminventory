import React, { Component } from 'react'
import "./App.css";
import Inventaires from './components/addshowinv/inventaires';
import AddItem from './components/addshowinv/addItem/additem';
import Commande from './components/addshowcom/commandes';
import axios from "axios"
const url = "http://localhost:5000/items";

export default class App extends Component {

  constructor(props){
    super(props)
    this.itemnumber= React.createRef();
    this.state = {
      isUpdate:false,
      isSearching:false,
      searchVal:'',
      foundedItems:[],
      commandes:[],
      isCommanding:false,
      count:0
    }
  }

  updateState = (bool) =>{
    this.setState({
      isUpdate:bool
    })
    console.log(bool)
  }

  onchange = async (e) => {
    e.preventDefault();
    let item = {
      key:e.target.value
    }
    if(item.key===""){
      this.setState({
        isSearching:false
      })
    }else{
      try {
        await 
          axios.post(url+'/search',item)
            .then(result=>{
              this.setState({
                foundedItems:result.data,
                isSearching:true
              })
            })
            .catch(err=>alert(err))
        
      } catch (error) {
        alert(error)
      }
    }

    
  }

  onclickadd = (e,name,outPrice) =>{
    e.preventDefault();
    let totalPriceAllItem = Number(this.state.count)*Number(outPrice);
    let commande = {
      name:name,
      count:this.state.count,
      outPrice:outPrice,
      totalPrice:totalPriceAllItem
    }
    this.setState({
      commandes:[...this.state.commandes,commande],
      isCommanding:true
    })
    
  }
  
  componentDidUpdate(){
    let {
      commandes,
      isCommanding
    } = this.state;
    if(isCommanding){
      console.log(commandes)
      this.setState({
        isCommanding:false
      })
    }

  }

  validate = async () => {
    let {commandes} = this.state;
    try {
      await axios.post(url + "/update" ,commandes)
         .then(res=>{
           alert(res.data)
         })
    } catch (error) {
      alert(error)
    }
  }

  render() {
    let {
      isUpdate,
      isSearching,
      foundedItems,
      commandes
    } = this.state;

    return (
      <div className="row">

        <div className="invpar">
          <div className = "inv">

            {!isSearching&&
              <Inventaires 
                updatestate = {this.updateState}
                isupdate = {isUpdate}
              />
            }
            {
              isSearching&&(
                <div>
                <div className="item">
                    <p className='table'>Nom</p>
                    <p className='table'>Dans l'inventaire</p>
                    <p className='table'>Prix</p>
                    <p className='table'>Demmandes</p>
                    <p className='table'></p>
                </div>
                  {
                    foundedItems.map(({name,_id,outPrice,count})=>(
                      <div
                        key={_id} 
                        className="founded"
                      >
                        <div className="item">
                            <p className='table'>{name}</p>
                            <p className='table'>{count}</p>
                            <p className='table'>{outPrice}</p>
                            <input 
                              type="number"
                              className="table"
                              onChange={count=>this.setState({count:count.target.value})}
                            />
                            <button
                              className="btnadditem"
                              onClick={(e)=>this.onclickadd(e,name,outPrice)}
                            >ajouter a la commande</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
              
              
            }
            
          </div>
          <input 
            type="text"
            onChange={this.onchange}
          />
        </div>

        <div className="col">
          <div className="addItem">
            <AddItem updatestate = {this.updateState}/>
          </div>
          <div className = "inv">
            <div className="item">
              <p className='table'>Nom</p>
              <p className='table'>Prix</p>
              <p className='table'>nombre</p>
              <p className='table'>total</p>
            </div>            
            {
              commandes&&commandes.map(ele=>(
                <Commande key={ele.name} caracs={ele}/>
              ))
            }
            <button
              onClick={()=>{
                this.validate()
              }}
            >valider</button>
          </div>
          
        </div>
        
      </div>
    )
  }
}

