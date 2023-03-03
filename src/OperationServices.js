import axios from "axios";
const url = "http://localhost:5000/api/operations/";

class OperationServices {
  //  get all operations
  static getOperations() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((invoice) => ({
            ...invoice,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  // insert operation
  static insertOperation(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/operations/add?name=${name}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   update operation
  static updateOperation(id, name) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/operations/set?id='${id}'&name=${name}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   delete operation
  static deleteOperation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/operations/delete?id=${id}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   get operation by id
  static getOperation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/operations/get?id=${id}`
        );
        const data = res.data;
        console.log(data);
        resolve(
          data.map((post) => ({
            ...post,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default OperationServices;
