import { Component } from "react";
import axios from "axios";

class DataFetcher extends Component {
    async fetchData(type) {
        return await axios
            .get(`http://localhost:8000/api/${type}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async getServiceProviderData() {
        return this.fetchData("service-provider");
    }

    async getServiceData() {
        return this.fetchData("service");
    }

    async getStaffData() {
        return this.fetchData("staff");
    }

    async getCustomerData() {
        return this.fetchData("customer");
    }

    async getAppointmentData() {
        return this.fetchData("appointment");
    }

    async getRatingData() {
        return this.fetchData("rating");
    }

    async getSpecificData(type, key) {
        return await axios
            .get(`http://localhost:8000/api/${type}/${key}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async getSpecificServiceProviderData(key) {
        return this.fetchData("service-provider", key);
    }

    async getSpecificServiceData(key) {
        return this.fetchData("service", key);
    }

    async getSpecificStaffData(key) {
        return this.fetchData("staff", key);
    }

    async getSpecificCustomerData(key) {
        return this.fetchData("customer", key);
    }

    async getSpecificAppointmentData(key) {
        return this.fetchData("appointment", key);
    }

    async getSpecificRatingData(key) {
        return this.fetchData("rating", key);
    }
}

export default DataFetcher;
