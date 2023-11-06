import React, { useState } from 'react';
import { Input, Button, Panel, InputGroup } from 'rsuite';
import DataSender from './DataSender';
import "./styles/InputButton.css";
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
        <Panel header={<h3>Add new service</h3>}>
            <div>
                <h5>Service Picture: </h5>
                <img
                    src={servicePicture}
                    alt="No service picture"
                    className="custom-picture" />
                <br />
                <input
                    className="custom-input"
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                />
            </div>
            <div>
                <h5>Profile Picture: </h5>
                <Input
                    className="custom-input"
                    placeholder="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                />
            </div>
            <div>
                <h5>Type: </h5>
                <Input
                    className="custom-input"
                    placeholder="Type"
                    value={type}
                    onChange={(value) => setType(value)}
                />
            </div>
            <div>
                <h5>Duration: </h5>
                <InputGroup inside style={styles}>
                    <Input
                        className="custom-input"
                        type="int"
                        placeholder="Duration"
                        value={duration}
                        onChange={(value) => setDuration(value)}
                    />
                    <InputGroup.Addon>minute</InputGroup.Addon>
                </InputGroup>
            </div>
            <div>
                <h5>Price: </h5>
                <InputGroup inside style={styles}>
                    <Input
                        className="custom-input"
                        placeholder="Price"
                        value={price}
                        onChange={(value) => setPrice(value)}
                    />
                    <InputGroup.Addon>฿</InputGroup.Addon>
                </InputGroup>
            </div>
            <Button appearance="primary" onClick={addServiceInfo}>
                Create new service
            </Button>
        </Panel>
    );
};

export default CreateNewService;

