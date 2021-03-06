import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export class AdminCreateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            age: 0,
            email: "",
            avatar: "",
            bio: "",
            loveStatus: "",
            zipCode: 0,
            address: "",
            city: "",
            password: "",
            toquesAvailable: 0,
            admin: false
        };
    }

    componentDidMount() {
        this.setState({
            firstname: this.state.firstname,
            newFirstname: this.state.firstname,
            lastname: this.state.lastname,
            newLastname: this.state.lastname,
            age: this.state.age,
            newAge: this.state.age,
            email: this.state.email,
            newEmail: this.state.email,
            avatar: this.state.avatar,
            newAvatar: this.state.avatar,
            bio: this.state.bio,
            newBio: this.state.bio,
            loveStatus: this.state.loveStatus,
            newLoveStatus: this.state.loveStatus,
            zipCode: this.state.zipCode,
            newZipCode: this.state.zipCode,
            address: this.state.address,
            newAddress: this.state.address,
            city: this.state.city,
            newCity: this.state.city,
            password: this.state.password,
            newPassword: this.state.password,
            toquesAvailable: this.state.tocqueAvailable,
            newToquesAvailable: this.state.tocqueAvailable,
            admin: this.state.admin,
            newAdmin: this.state.admin
        });
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleAddUser = e => {
        e.preventDefault();

        var addUser = {
            firstname: this.state.newFirstname,
            lastname: this.state.newLastname,
            age: parseInt(this.state.newAge),
            email: this.state.newEmail,
            avatar: this.state.newAvatar,
            bio: this.state.newBio,
            loveStatus: this.state.newLoveStatus,
            address: this.state.newAddress,
            zipCode: parseInt(this.state.newZipCode),
            city: this.state.newCity,
            password: this.state.newPassword,
            toquesAvailable: parseInt(this.state.newToquesAvailable),
            admin:this.state.newAdmin
        };

        axios.post("https://meetmeal-dev.herokuapp.com" + `/users/register` , addUser)
            .then(res => {
                alert('Votre profil a été modifié');
                this.props.history.push('/admin');
            })
            .catch(err => {
                console.error(err.response);
            })
    }

    render() {
        return(
            <div className="container">
                <div className= 'row'>
                    <form onSubmit={ this.handleAddUser }>
                        <div className='title'>
                            <h1>Ajouter un profile: </h1>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newFirstname' placeholder='firstname' className='input-firstname' onChange={ this.handleChange } required></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newLastname' placeholder='lastname' className='input-lastname' onChange={ this.handleChange } required></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newAge' className='input-age' placeholder='age' onChange={ this.handleChange }required></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='email'  name='newEmail' className='input-email' placeholder='email' onChange={ this.handleChange } required></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newAvatar' className='input-avatar' placeholder='avatar' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='textarea'  name='newBio' className='input-bio' placeholder='biographie' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newLoveStatus' className='input-loveStatus' placeholder='Situation Amoureuse' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newZipCode' className='input-zipCode' placeholder='Code Postal' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newAddress' className='input-address' placeholder='Adresse' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newCity' className='input-city' placeholder='Ville' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='password' name='newPassword' className='input-password' placeholder='Mot de Passe' required onChange={ this.handleChange } ></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type='text'  name='newToquesAvailable' className='input-toquesAvailable' placeholder='Monnaie Toque' onChange={ this.handleChange }></input>
                        </div>
                        <div className='col lg-4 user-inputs'>
                            <input type="checkbox" name="newAdmin" className='input-Admin' value="true"  onChange={this.handleChange}/>Admin
                        </div>
                        <button className="submit">Ajoutez un profile</button>
                        <button className="reset"><Link to='/edituser'>Annuler</Link></button>
                    </form>
                </div>
            </div>
        )
    }
}