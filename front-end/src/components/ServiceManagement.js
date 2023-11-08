import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Loader, InputGroup } from 'rsuite';
import { useParams } from 'react-router-dom';
import "./styles/InputButton.css";
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';

const ServiceManagement = () => {
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [servicePicture, setServicePicture] = useState('');
    const [serviceData, setServiceData] = useState([]);
    const dataSender = new DataSender();
    const dataFetcher = new DataFetcher();
    const { serviceId } = useParams();
    const styles = {
        width: 300,
        marginBottom: 10
    };

    useEffect(() => {
        if (service === null) {
            try {
                const fetchData = async () => {
                    const serviceData = await dataFetcher.getServiceData(serviceId);
                    setServiceData(serviceData);

                    if (serviceData) {
                        setService(serviceData);
                        setName(serviceData.name);
                        setType(serviceData.type);
                        setDuration(serviceData.duration);
                        setServicePicture(serviceData.service_picture)
                        setPrice(serviceData.price);
                    }
                    setLoading(false);
                };
                fetchData();
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
    }, [serviceData, serviceId]);

    const updateServiceInfo = () => {
        if (!name || !type || !duration || !price || !servicePicture) { 
            window.alert('Please fill in all input fields.');
            return;
        }

        const shouldUpdate = window.confirm('Are you sure you want to update service information?');

        if (shouldUpdate) {
            const updatedServiceData = {
                name: name,
                type: type,
                duration: duration,
                price: price,
                service_picture: servicePicture,
            };

            dataSender.updateServiceData(updatedServiceData, service.id).then(() => {
                console.log('Service information updated.');
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
                console.error('Error converting image to base64:', error);
            }
        }
    };

    return (
        <div>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <Panel header={<h3>Service Information: {service ? service.name : ''}</h3>}>
                    <div>
                        <h5>Service picture: </h5>
                        <img
                            src={servicePicture}
                            alt="No service picture"
                            className="custom-picture"
                        />
                        <br />
                        <input
                            className="custom-input"
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                    </div>
                    <div>
                        <h5>Name: </h5>
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
                    <Button appearance="primary" onClick={updateServiceInfo}>
                        Update Service Information
                    </Button>
                </Panel>
            )}
        </div>
    );
};

export default ServiceManagement;

