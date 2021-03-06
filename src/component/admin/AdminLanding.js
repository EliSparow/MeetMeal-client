import React, { Component, Fragment } from 'react';
import { ListUsers } from '../profile/ListUsers';
import axios from 'axios';
import { AdminCreateForm } from './AdminCreateForm';
import Spinner from '../layout/Spinner';

export class AdminLanding extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            admin : false,
            switch: "listusers"
        }
    }

    componentDidMount() {
        this.setState({ user: this.state.user });
        const header = {
            'x-auth-token': localStorage.getItem('token')
          }

        axios.get("https://meetmeal-dev.herokuapp.com" + '/users/my-profile', { headers: header })
          .then((res) => {
              this.setState({
                user : res.data,
                admin : res.data.admin })
          })
          .catch((err) => {
              console.error(err);
          })
    }
    
    switchFormCreate = () => {
        this.setState({ switch : "FormCreate" })
    }
    
    switchUserList = () => {
        this.setState({ switch: "listusers" })
    }
    
    render() {
        var UsersCompo;
        if (this.state.switch === "listusers"){
            UsersCompo = <ListUsers/>
        }
        if(this.state.switch === "FormCreate") {
            UsersCompo = <AdminCreateForm/>
        }
        const { admin } = this.state

        return(
            <Fragment>
                <div>
                    { admin ? (
                        <div className='test'>
                            <h1 className='admintitle'>Salut Admin</h1>
                            <p>Salut Admin</p>
                            <div className='testButton'>
                                <button className='button' onClick={this.switchUserList}>Liste des Utilisateurs</button>

                                <button className='button' onClick={this.switchFormCreate}>Formulaire d'inscription</button>
                            </div>
                            <div className="Listusers">
                                { UsersCompo }
                            </div>
                        </div>
                    ) : (
                        <div className='testadminFalse'>
                            <Spinner/>
                        </div>
                    ) }
                </div>
            </Fragment>
        )
    }
}