import React, { useState, useEffect } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';

const ServiceManagement = ({ serviceData }) => {
    const [service, setService] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const dataSender = new DataSender();
    const { serviceId } = useParams()

    useEffect(() => {
        const serviceMember = serviceData.find(service => service.id && service.id.toString()  === serviceId );
        if (serviceMember) {
            setService(serviceMember);
            setName(serviceMember.name);
            setType(serviceMember.type);
            setDuration(serviceMember.duration);
            setPrice(serviceMember.price);
        }
    }, [serviceData, serviceId]);


    const updateServiceInfo = () => {
        const updatedServiceData = {
            name,
            type,
            duration,
            price
        };

        dataSender.updateServiceData(updatedServiceData, service.id).then(() => {
            console.log('Service information updated.');
        });
    };

    return (
        <div>
            <Panel header={`Service Management: ${service ? service.name : ''}`}>
                <h3>Staff Information:</h3>
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

