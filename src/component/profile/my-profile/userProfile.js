import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserEvents from './userEvents.js';
import '../../../stylesheets/profile/profil.scss';
import '../../../stylesheets/userProfile.css';

const getUserProfile = (( setProfiles, props) => {
  const header = {
    'x-auth-token': localStorage.getItem('token')
  }
  console.log(header);
  axios.get(process.env.REACT_APP_API + '/users/my-profile',
    { headers: header},
  ).then(res => {
    setProfiles(res.data)
  }).catch(err => {
    console.error(err);
    //alert('Nous sommes désolés, nous faisons face à un problème de serveur')
    props.history.push('/')
  })
});

const UserProfile = (props, history) => {
  let [profiles, setProfiles] = useState([])
    if (profiles.length === 0){
      getUserProfile(setProfiles, history, props)
    }

  return (
    <div className='container user-profile'>
      {profiles ? (
        <div>
        <div className='row'>
          <div className='col-lg-3 user-info-intro'>
            <img className='img-fluid' src={profiles.avatar} alt='user profile avatar'></img>
          </div>
          {/* <div className='row'> */}
            <div className='col-lg-9 user-info-intro'>
              <h1 className='user-name'> {profiles.firstname} {profiles.lastname}</h1>
            </div>
            <br/>
            <div className='col-lg-4 info-profile' id='info-profile'>
              <div className='user-name'><h3> Situation amoureuse :  {profiles.loveStatus}</h3></div>
            </div>
          {/* </div> */}
          {/* <div className='row'> */}
            <div className='col-lg-4 user-info-intro'>
              <h3 className='user-info'>Localisation: {profiles.zipCode} {profiles.city}</h3>
            </div>
          {/* </div> */}
          {/* <div className='row'> */}
            <div className='col-lg-4 user-info-bio'>
              <h3 className='user-bio'>Description: {profiles.bio}</h3>
            {/* </div> */}
          </div>
          <Link to ='/edituser' className='btn btn-warning btn-sm'>
            Modifier Votre Profile
          </Link>
          <Link to ='/deleteuser' className='btn btn-danger btn-sm'>
            Bloquez votre compte
          </Link>
          </div>

          <div>
            <UserEvents />
          </div>
          </div>
          ) : null }

    </div>
  );
}

export default UserProfile;
