import axios from "axios";
const url = "http://localhost:5000/api/patients/";

class PatientServices {
  //  get all patients
  static getPatients() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((patient) => ({
            ...patient,
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  // insert patient
  static insertPatient(

    name,
    phoneNumber,
    gender,
    dateOfBirth,
    cucurrentMedication = "",
    caseStudy = "",
    notes =""
  ) {
    console.log(dateOfBirth);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/patients/add?name=${name}&pn=${phoneNumber}&gen=${gender}&dob=${dateOfBirth}&cm=${cucurrentMedication}&cs=${caseStudy}&not=${notes}`
        );
        const a= await this.getPatients();
        const data = res.data;

        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   update patient
  static updatePatient(
    id,
    name,
    phoneNumber,
    gender,
    dateOfBirth,
    curentMedication = "",
    caseStudy = "",
    notes = ""
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/patients/set?id='${id}'&name=${name}&pn=${phoneNumber}&gen=${gender}&dob=${dateOfBirth}&cm=${curentMedication}&cs=${caseStudy}&not=${notes}`
        );
        const data = res.data;
        const a= await this.getPatients();

        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   delete patient
  static deletePatient(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/patients/delete?id=${id}`
        );
        const data = res.data;
        const a= await this.getPatients();

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   get patient by id
  static getPatient(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/patients/get?id=${id}`
        );
        const data = res.data;

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

export default PatientServices;
