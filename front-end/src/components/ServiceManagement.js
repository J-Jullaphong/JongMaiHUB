import React, { useState, useEffect } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';
import DataFetcher from './DataFetcher';

const ServiceManagement = () => {
    const [service, setService] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [servicePicture, setServicePicture] = useState('');
    const [serviceData, setServiceData] = useState([]);
    const dataSender = new DataSender();
    const dataFetcher = new DataFetcher();
    const { serviceId } = useParams()

    useEffect(() => {
        if (service === null) {
            try {
                const fetchData = async () => {
                    const serviceData = await dataFetcher.getServiceData(serviceId)
                    setServiceData(serviceData);

                    if (serviceData) {
                        setService(serviceData);
                        setName(serviceData.name);
                        setType(serviceData.type);
                        setDuration(serviceData.duration);
                        setPrice(serviceData.price);
                    }
                };
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }, [serviceData, serviceId]);


    const updateServiceInfo = () => {
        const updatedServiceData = {
            name,
            type,
            duration,
            price,
            service_picture: servicePicture
        };

        dataSender.updateServiceData(updatedServiceData, service.id).then(() => {
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
        <div>
            <Panel header={`Service Management: ${service ? service.name : ''}`}>
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
                <Button appearance="primary" onClick={updateServiceInfo}>
                    Update Service Information
                </Button>
            </Panel>
        </div>
    );
};

export default ServiceManagement;
