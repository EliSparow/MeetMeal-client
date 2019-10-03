import React, { Component } from "react";
import axios from 'axios';

import '../../stylesheets/cardEvent.css';

class CardEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: "",
      firstname: "",
      lastname: "",
      avatar: "",
      title: "",
      descritpion: "",
      city: "",
      cost: "",
      numberMaxOfGuests: "",
      typeOfMeal: "",
      typeOfCuisine: "",
      guests: "",
      comments: "",
      user: null,
      joinedMeals: false,
      createdMeals: false
    }
  }

  async componentDidMount() {
    const header = {
      'x-auth-token': localStorage.getItem('token')
    }

    await axios.get("https://meetmeal-dev.herokuapp.com" + '/users/my-profile', { headers: header })
          .then((res) => {
            this.setState({ user: res.data })
          })
          .catch((err) => {
            console.error(err.response);
          })

    this.setState({
      _id: this.props._id,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      avatar: this.props.avatar,
      title: this.props.title,
      description: this.props.description,
      city: this.props.city,
      cost: this.props.cost,
      numberMaxOfGuests: this.props.numberMaxOfGuests,
      typeOfMeal: this.props.typeOfMeal,
      typeOfCuisine: this.props.typeOfCuisine,
      guests: this.props.guests,
      comments: this.props.comments
    })

    const url = "https://meetmeal-dev.herokuapp.com" + '/events/' + this.state._id + '/addGuest';
     axios.put(url, null,
                { headers: header }
                ).then( res => {
                  console.log(res.data);
                }).catch( err => {
                  if (err.response.data.msg === 'Vous ne pouvez pas rejoindre votre propre evenement')
                    this.setState({createdMeals: true})
                  else if (err.response.data.msg === 'Vous etes deja inscrit a cet evenement')
                    this.setState({joinedMeals: true})
                  else
                    console.log(err.response);
                })
}

  // Go on the presentation page of an event
  handleSubmit = async (event) => {
   event.preventDefault();
    const url = '/event/:' + this.state._id.toString() ;
    this.props.history.push(url)
  }

  // Edit an event
  checkEdit = () => {
    const { user, _id } = this.state;
    if ( user && (user._id === this.props.user._id)){
      return(
        <div className='edit-button'>
          <a href={"/editevent/" + _id}><button className="btn btn-warning">Modifiez votre évènement!</button></a>
        </div>
      )
    }
  }


// Function to subscribe to an event :
  subscribeToAnEvent = async (event) => {
    event.preventDefault();
    const header = {
      'x-auth-token': localStorage.getItem('token')
    }

    const userInfo = await axios.get("https://meetmeal-dev.herokuapp.com" + '/users/my-profile',
          { headers: header})

    const userToquesAvailable = userInfo.data.toquesAvailable

    if (userToquesAvailable < this.state.cost)
      alert("Vous n'avez pas assez de toques disponibles pour vous inscire à cet évenement.")
    else {
    const url = "https://meetmeal-dev.herokuapp.com" + '/events/' + this.state._id + '/addGuest';
      await axios.put(url, null,
                  { headers: header }
                  ).then( res => {
                    console.log(res.data);
                  }).catch( err => {
                    if (err.response.data.msg === 'Vous ne pouvez pas rejoindre votre propre evenement')
                      alert('Vous ne pouvez pas rejoindre votre propre evenement');
                    else if (err.response.data.msg === 'Vous etes deja inscrit a cet evenement')
                      alert('Vous etes deja inscrit a cet evenement')
                    else if ( err.response.data.msg === "Nombre maximum d'invites deja atteint")
                      alert("Nombre maximum d'invites deja atteint")
                    else
                      console.log(err.response);
                  })
    }
  }

  render(){
    const {
      firstname,
      lastname,
      avatar,
      title,
      description,
      city,
      cost,
      numberMaxOfGuests,
      typeOfMeal,
      typeOfCuisine
    } = this.state;

    var pickButton = () => {
      if( this.state.joinedMeals === true )
          return ( <button type="submit" onClick={this.handleSubmit}>Déjà inscrit ! Voir l'évenement</button>)
        else if ( this.state.createdMeals === true )
          return ( <button type="submit" onClick={this.handleSubmit}>Voir votre évenement</button>)
        else
          return (<button type="submit" onClick={this.subscribeToAnEvent}>Je rejoins l'évenement !</button>)
    }

    return (
      <div className="card row" style={{width: 70 + 'em', marginTop: 2 + 'em'}}>
        <div className="card-body row">
          <div className='image col-3'>
            <img src={avatar} alt='user profile avatar'></img>
            <h6 className="card-subtitle text-muted">{firstname} {lastname}</h6>
          </div>
          <div className="col-5">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Type de repas : {typeOfMeal}</p>
            <p className="card-text">Type de cuisine : {typeOfCuisine}</p>
            <p className="card-text">{description}</p>
            <p className="card-text"><i className="fa fa-map-marker"/> {city}</p>
          </div>
          <div className="col-4">
            <p className="card-text">Pour {numberMaxOfGuests} personnes</p>
            <p className="card-text">Coût : {cost} Toques</p>
            {(this.state.createdMeals === true || this.state.joinedMeals === true) ? pickButton() : (<button type="submit" onClick={this.subscribeToAnEvent}>Je rejoins l'évenement !</button>)}
          </div>
        </div>
    </div>
    )
  }
}

export default CardEvent;
