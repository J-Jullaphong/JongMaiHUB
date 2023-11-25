import { Component } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

class DataFetcher extends Component {
  state = {
    api: `${process.env.REACT_APP_BACKEND_API_URL}/`,
  };

  decryptData = (encryptedData) => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(encryptedData.ciphertext) },
        CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_KEY),
        {
          iv: CryptoJS.enc.Base64.parse(encryptedData.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedText);
    } catch (error) {
      console.error("Error decrypting data:", error.message);
      return null;
    }
  };

  async fetchData(type, key = "", param = "") {
    let url = `${this.state.api}${type}/`;

    const headers = {
      headers: { Authorization: `Token ${process.env.REACT_APP_API_TOKEN}` },
    };

    if (key) {
      url += `${key}/`;
    }

    if (param) {
      url += `?${param}`;
    }

    return await axios
      .get(url, headers)
      .then((response) => {
        return this.decryptData(response.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getServiceProviderData(key = "") {
    return this.fetchData("service-provider", key);
  }

  async getServiceData(key = "") {
    return this.fetchData("service", key);
  }

  async getStaffData(key = "") {
    return this.fetchData("staff", key);
  }

  async getCustomerData(key = "") {
    return this.fetchData("customer", key);
  }

  async getAppointmentData(key = "") {
    return this.fetchData("appointment", key);
  }

  async getRatingData(key = "") {
    return this.fetchData("rating", key);
  }

  async getStaffByServiceProvider(providerKey) {
    return this.fetchData("staff", "", `service_provider=${providerKey}`);
  }

  async getAppointmentByStaff(staffKey) {
    return this.fetchData("appointment", "", `staff=${staffKey}`);
  }

  async getServiceByServiceProvider(providerKey) {
    return this.fetchData("service", "", `service_provider=${providerKey}`);
  }

  async getAppointmentByCustomer(customerKey) {
    return this.fetchData("appointment", "", `customer=${customerKey}`);
  }

  async getAppointmentByProvider(providerKey) {
    return this.fetchData("appointments-provider", providerKey, "");
  }
}

export default DataFetcher;
