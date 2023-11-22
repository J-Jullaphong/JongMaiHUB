import { Component } from "react";
import axios from "axios";

class DataFetcher extends Component {
  state = {
    api: `${process.env.REACT_APP_BACKEND_API_URL}/`,
  };

  async fetchData(type, key = "", param = "") {
    let url = `${this.state.api}${type}/`;

    if (key) {
      url += `${key}/`;
    }

    if (param) {
      url += `?${param}`;
    }

    return await axios
      .get(url)
      .then((response) => {
        return response.data;
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
