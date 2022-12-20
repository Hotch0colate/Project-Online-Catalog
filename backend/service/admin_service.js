import axios from "axios";
const url = "http://localhost:4000/"
export async function check_order(email, password) {
  const res = await axios.get(url + '/admin/checkorder');
  return res;
}
export async function deatail_order(id) {
    const res = await axios.get(url + `/admin/detail-order/${id}`, );
    return res;
}