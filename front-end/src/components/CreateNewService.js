import React, { useState } from 'react';
import { Input, Button, Panel, InputGroup } from 'rsuite';
import DataSender from './DataSender';
import "./styles/ProviderManagement.css";
import { useParams, useNavigate } from 'react-router-dom';

const CreateNewService = () => {
    const { providerId } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [servicePicture, setServicePicture] = useState("");
    const dataSender = new DataSender();
    const navigate = useNavigate();
    const styles = {
        width: 300,
        marginBottom: 10
    };


    const addServiceInfo = () => {
        if (!name || !type || !duration || !price || !servicePicture) {
            window.alert('Please fill in all input fields.');
            return;
        }

        if (!Number.isInteger(Number(duration))) {
            window.alert('Duration must be a valid integer.');
            return;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            window.alert('Price must be a valid integer or float with up to two decimal places.');
            return;
        }

        const shouldAddService = window.confirm('Are you sure you want to add this service?');

        if (shouldAddService) {
            const NewServiceData = {
                name: name,
                type: type,
                duration: duration,
                price: price,
                service_picture: servicePicture,
                service_provider: providerId,
            };

            window.alert('Successfully added service.');
            dataSender.submitServiceData(NewServiceData).then(() => {
                console.log('Service information added.');
                navigate('/provider-management');
            });
        }
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64Image = await dataSender.convertImageToBase64(file);
                setServicePicture(base64Image);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    return (
        <div className="provider-management">
            <h2 className="provider-title">Add New Service</h2>
            <Panel
                className="provider-information">
                <div
                    className="provider-content-container">
                    <div className="provider-picture-container">
                        <h5>Service Picture</h5>
                        <img
                            src={servicePicture}
                            alt="No service picture"
                            className="provider-custom-picture" />
                        <br />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                    </div>
                    <div
                        className="provider-input-container">
                        <div
                            className="provider-input-field">
                            <h5>Name</h5>
                            <Input
                                className="provider-custom-input"
                                placeholder="Name"
                                value={name}
                                onChange={(value) => setName(value)}
                            />
                        </div>
                        <div
                            className="provider-input-field">
                            <h5>Type</h5>
                            <Input
                                className="provider-custom-input"
                                placeholder="Type"
                                value={type}
                                onChange={(value) => setType(value)}
                            />
                        </div>
                        <div
                            className="provider-input-field">
                            <h5>Duration</h5>
                            <InputGroup inside style={styles}>
                                <Input
                                    className="provider-custom-input"
                                    type="int"
                                    placeholder="Duration"
                                    value={duration}
                                    onChange={(value) => setDuration(value)}
                                />
                                <InputGroup.Addon>minute</InputGroup.Addon>
                            </InputGroup>
                        </div>
                        <div
                            className="provider-input-field">
                            <h5>Price</h5>
                            <InputGroup inside style={styles}>
                                <Input
                                    className="provider-custom-input"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(value) => setPrice(value)}
                                />
                                <InputGroup.Addon>฿</InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                </div>
                <br />
                <Button appearance="primary" onClick={addServiceInfo}>
                    Create new service
                </Button>
            </Panel>
        </div>
    );
};

export default CreateNewService;

