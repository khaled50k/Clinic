import axios from "axios";
const url = "http://localhost:5000/api/invoices/";

class InvoiceServices {
  //  get all Invoices
  static getInvoices() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        // this.deleteInvoice(15);
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
  // insert Invoice
  static insertInvoice(pID, price, discount, opID,notes) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/invoices/add?pid=${pID}&price=${price}&disc=${discount}&opid=${opID}&notes=${notes}`
        );
        const data = res.data;

        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   update Invoice
  static updateInvoice(id, pID, price, discount, opID,notes) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/invoices/set?id='${id}'&pid=${pID}&price=${price}&disc=${discount}&opid=${opID}&notes=${notes}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   delete Invoice
  static deleteInvoice(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/invoices/delete?id=${id}`
        );
        const data = res.data;
        resolve(data.status);
      } catch (error) {
        reject(error);
      }
    });
  }
  //   get Invoice by id
  static getInvoice(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/invoices/get?id=${id}`
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

export default InvoiceServices;
