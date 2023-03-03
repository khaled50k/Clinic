import axios from "axios";
const url = "";
class AdminServices {
  static getAdmin(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/get?username=${username}`
        );
        const data = res.data;
        resolve(
          data.map((user) => ({
            ...user,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default AdminServices;
