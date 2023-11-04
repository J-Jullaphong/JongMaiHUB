import React, { useState } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';

const CreateNewService = () => {
    const { providerId } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [servicePicture, setServicePicture] = useState("");
    const [serviceProvider, setServiceProvider] = useState("");
    const dataSender = new DataSender();


    const addServiceInfo = () => {

        const NewServiceData = {
            name,
            type,
            duration,
            price,
            service_picture: servicePicture,
            service_provider: providerId,
        };

        dataSender.submitServiceData(NewServiceData).then(() => {
            console.log('Service information updated.');
        });
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
        <Panel header="Create New Service">
            <h3>Service Information:</h3>
            <img src={servicePicture} alt="No service picture" />
            <div>
                <label>Service Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                />
            </div>
            <Input
                placeholder="Name"
                value={name}
                onChange={(value) => setName(value)}
            />
            <Input
                placeholder="Type"
                value={type}
                onChange={(value) => setType(value)}
            />
            <Input
                placeholder="Duration"
                value={duration}
                onChange={(value) => setDuration(value)}
            />
            <Input
                placeholder="Price"
                value={price}
                onChange={(value) => setPrice(value)}
            />
            <Button appearance="primary" onClick={addServiceInfo}>
                Create Service
            </Button>
        </Panel>
    );
};

export default CreateNewService;
