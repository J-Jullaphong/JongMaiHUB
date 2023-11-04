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


    async submitData(type, formData) {
        return await axios
            .post(`${this.state.api}${type}/`, formData)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    async updateData(type, formData, key = "") {
        return await axios
            .patch(`${this.state.api}${type}/${key}/`, formData)
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

    async submitServiceProviderData(formData) {
        return this.submitData("service-provider", formData);
    }

    async submitServiceData(formData) {
        return this.submitData("service", formData);
    }

    async submitStaffData(formData) {
        return this.submitData("staff", formData);
    }

    async submitCustomerData(formData) {
        return this.submitData("customer", formData);
    }

    async submitAppointmentData(formData) {
        return this.submitData("appointment", formData);
    }

    async submitRatingData(formData) {
        return this.submitData("rating", formData);
    }

    async updateServiceProviderData(formData, key) {
        return this.updateData("service-provider", formData, key);

    }

    async updateServiceData(formData, key) {
        return this.updateData("service", formData, key);
    }

    async updateStaffData(formData, key) {
        return this.updateData("staff", formData, key);
    }

    async updateCustomerData(formData, key) {
        return this.updateData("customer", formData, key);
    }

    async updateAppointmentData(formData, key) {
        return this.updateData("appointment", formData, key);
    }

    async updateRatingData(formData, key) {
        return this.updateData("rating", formData, key);
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
