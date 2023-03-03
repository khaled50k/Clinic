import axios from "axios";
const url = "http://localhost:5000/api/appoitments/";

class AppointmentServices {
  //  get all Appoitments
  static getAppoitments() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((appoitment) => ({
            ...appoitment,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  static CheckAppoitmentStart(appstart) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appoitments/checkstart?appstart=${appstart}`);
        const data = res.data;
        resolve(
          data.map((appoitment) => ({
            ...appoitment,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  static CheckAppoitmentEnd(append) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/appoitments/checkend?append=${append}`);
        const data = res.data;
        resolve(
          data.map((appoitment) => ({
            ...appoitment,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  // insert Appoitment
  static insertAppoitment(pID, appStart, appEnd, cancelled=false,notes='') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/appoitments/add?pid=${pID}&appstart=${appStart}&append=${appEnd}&cans=${cancelled}&notes=${notes}`
        );
        const data = res.data;

        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   update Appoitment
  static updateAppoitment(id, pID, appStart, appEnd, cancelled = false,notes='') {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/appoitments/set?id='${id}'&pid=${pID}&appstart=${appStart}&append=${appEnd}&cans=${cancelled}&notes=${notes}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   delete Appoitment
  static deleteAppoitment(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/appoitments/delete?id=${id}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   get Appoitment by id
  static getAppoitment(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/appoitments/get?id=${id}`
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

export default AppointmentServices;
