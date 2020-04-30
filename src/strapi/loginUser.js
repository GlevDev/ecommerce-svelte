import axios from 'axios';
import url from './URL';
import setupUser from './setupUser';

async function loginUser({email, password}) {
  try {
    const response = await axios.post(`${url}/auth/local`, {
      identifier: email,
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

export default loginUser;