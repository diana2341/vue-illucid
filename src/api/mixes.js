import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const ILLUCID_BACKEND_URL = process.env.VUE_APP_ILLUCID_BACKEND_URL;

export  async function allMixes() {
  try {
    let response = await axios.get(`${ILLUCID_BACKEND_URL}/mixes`)
    let data = response;
    return data;
  } catch (error) {
    console.log(error.response); 

    return error.response;
  }

}


export  async function newMix(payload, headers) {
  try {
		const response = await axios.post(`${ILLUCID_BACKEND_URL}/mixes`, payload, headers);
    let data = response;
    return data;
  } catch (error) {
    console.log(error.response); 
    return error.response;
  }

}

export  async function removeMix(body) {
  try {
		const response = await axios.delete(`${ILLUCID_BACKEND_URL}/mixes`, { data: body });
    let data = response;
    return data;
  } catch (error) {
    console.log(error.response); 

    return error.response;
  }

}