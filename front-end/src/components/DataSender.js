import { Component } from "react";
import axios from "axios";

class DataSender extends Component {
    state = {
        api: "http://localhost:8000/api/",
    };

    reader = new FileReader();

    convertImageToBase64(file) {
        this.reader.onloadend = () => {
            return this.reader.result.toString();
        };
        this.reader.readAsDataURL(file);
    }

    async convertImagesInForm(formData) {
        const formDataClone = new FormData(formData);
        for (const [key, value] of formDataClone.entries()) {
            if (value instanceof File) {
                formDataClone.append(key, await this.convertImageToBase64(value));
            }
        }
        return formDataClone;
    }

    async submitData(type, formData, key = "") {
        return await axios
            .post(`${this.state.api}${type}/${key}`, this.convertImagesInForm(formData))
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async submitServiceProviderData(formData, key = "") {
        return this.fetchData("service-provider", formData, key);
    }

    async submitServiceProviderData(formData, key = "") {
        return this.submitData("service-provider", formData, key);
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
