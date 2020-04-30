import axios from 'axios';
import url from './URL';
import setupUser from './setupUser';

async function registerUser({email, password, username}) {
  try {
    const response = await axios.post(`${url}/auth/local/register`, {
      username,
      email,
      password
    });
    if(response) {
      setupUser(response);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default registerUser;
