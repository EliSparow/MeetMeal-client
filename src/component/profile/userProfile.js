import React from 'react';
import {BrowserRouter as Route} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

import '../../stylesheets/userProfile.css';

const getUserProfile = (setProfiles => {
  const header = {
    'x-auth-token': sessionStorage.getItem('token')
  }
  axios.get('http://localhost:1509/users/my-profile',
    { headers: header},
    console.log('je commence axios')
  ).then(res => {
    console.log('je suis dans le then');
    setProfiles(res.data)
    console.log(res.data);
  }).catch(err => {
    alert('Nous sommes désolés, nous faisons face à un problème de serveur')
    return (
      <Route exact path='/'></Route>
    )
  })
});

const UserProfile = () => {
  let [profiles, setProfiles] = useState([])
  console.log('let profile : ');
  console.log(profiles);
    if (profiles.length === 0){
      getUserProfile(setProfiles)
      console.log('let profile après if : ');
      console.log(profiles);
    }

  return (
    <div className='container user-profile'>
      <div className='row'>
          <div className='col-lg-1 user-info-intro'>
            <img className='image' src={profiles.avatar}></img>
          </div>
          <div className='col-lg-8 user-info-intro'>
            <h1 className='user-name'> {profiles.firstname} {profiles.lastname}</h1>
          </div>
          <div className='col-lg-3 info-profile' id='info-profile'>
            <div className='user-name'><p> Situation amoureuse :  {profiles.loveStatus}</p></div>
          </div>

      </div>
    </div>
  );
}

export default UserProfile;