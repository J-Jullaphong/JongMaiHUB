import { Component } from "react";
import axios from "axios";

class DataSender extends Component {
    state = {
        api: "http://localhost:8000/api/",
    };

    convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.toString());
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    async convertImagesInForm(eventTarget) {
        const formDataClone = new FormData(eventTarget);
        for (const [key, value] of formDataClone.entries()) {
            if (value instanceof File) {
                formDataClone.append(key, this.convertImageToBase64(value));
            }
        }
        return formDataClone;
    }

    async submitData(type, formData, key = "") {
        return await axios
            .post(
                `${this.state.api}${type}/${key}`,
                await this.convertImagesInForm(formData)
            )
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async submitServiceProviderData(formData, key = "") {
        return this.fetchData("service-provider", formData, key);
    }

    async submitServiceData(formData, key = "") {
        return this.submitData("service", formData, key);
    }

    async submitStaffData(formData, key = "") {
        return this.submitData("staff", formData, key);
    }

    async submitCustomerData(formData, key = "") {
        return this.submitData("customer", formData, key);
    }

    async submitAppointmentData(formData, key = "") {
        return this.submitData("appointment", formData, key);
    }

    async submitRatingData(formData, key = "") {
        return this.submitData("rating", formData, key);
    }
}

export default DataSender;
