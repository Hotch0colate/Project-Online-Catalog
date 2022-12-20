import axios from "axios";
const url = "http://localhost:4000/"
export async function sign_in(email, password) {
  const res = await axios.post(url + 'auth/sign-in', {
    "email": email,
    "password": password
  });
  return res;
}
export async function sign_up(name, email, password) {
  const res = await axios.post(url + 'auth/sign-up', {
    "name": name,
    "email": email,
    "password": password
  });
  return res;
}
export async function sign_out(token) {
  const res = await axios.delete(url + 'auth/sign-out', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res;
}