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
    const [servicePicture, setServicePicture] = useState("12345");
    const [serviceProvider, setServiceProvider] = useState("");


    const addServiceInfo = () => {
        const dataSender = new DataSender();

        const updatedServiceData = {
            name,
            type,
            duration,
            price,
            service_picture: servicePicture,
            service_provider: providerId,
        };

        dataSender.submitServiceData(updatedServiceData).then(() => {
            console.log('Service information updated.');
        });
    };

    return (
        <Panel header="Create New Service">
            <h3>Service Information:</h3>
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
