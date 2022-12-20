import axios from "axios";
const url = "http://localhost:4000/"
export async function show_product() {
  const res = await axios.get(url + 'product/');
  return res;
}
export async function create_order(token, data) {
  const res = await axios.post(url + 'auth/sign-in', {
    "data":data
  },
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res;
}
