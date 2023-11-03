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

    async convertImagesInForm(formData) {
        const updatedFormData = new FormData();
        for (const [key, value] of formData) {
            if (value instanceof File) {
                const base64Image = await this.convertImageToBase64(value);
                updatedFormData.append(key, base64Image);
            } else {
                updatedFormData.append(key, value);
            }
        }
        return updatedFormData;
    }


    async submitData(type, formData, key = "") {
        return await axios
            .post(
                `${this.state.api}${type}/${key}`, formData
            )
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async deleteData(type, key) {
        return await axios
            .delete(`${this.state.api}${type}/${key}`)
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

    async deleteStaff(key) {
        return this.deleteData("staff", key)
    }

    async deleteService(key) {
        return this.deleteData("service", key)
    }

    async deleteAppointment(key) {
        return this.deleteData("appointment", key)
    }
}

export default DataSender;
