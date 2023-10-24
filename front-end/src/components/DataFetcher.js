import { Component } from "react";
import axios from "axios";

class DataFetcher extends Component {
    state = {
        api: "http://localhost:8000/api/",
    };

    async fetchData(type, key = "") {
        return await axios
            .get(`${this.state.api}${type}/${key}`)
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
}

export default DataFetcher;
