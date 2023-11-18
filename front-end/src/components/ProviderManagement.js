import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Table } from 'rsuite';
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';
import { useNavigate } from 'react-router-dom';
import "./styles/ProviderManagement.css";

const ProviderManagement = ({ user }) => {
    const [currentProvider, setCurrentProvider] = useState(null);
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [coverPicture, setCoverPicture] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadProvider, setLoadProvider] = useState(true);
    const [serviceData, setServiceData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    const dataSender = new DataSender();
    const navigate = useNavigate();
    const dataFetcher = new DataFetcher();

    useEffect(() => {
            const fetchData = async () => {
                try {
                const [serviceData, providerData, staffData] = await Promise.all([
                    dataFetcher.getServiceByServiceProvider(user.getUID()),
                    dataFetcher.getServiceProviderData(user.getUID()),
                    dataFetcher.getStaffByServiceProvider(user.getUID()),
                ]);

                setServiceData(serviceData);
                setProviderData(providerData);
                setStaffData(staffData);
                setLoading(false);

                if (user.isProvider && loadProvider) {
                    if (providerData) {
                        setCurrentProvider(providerData);
                        setUid(providerData.uid);
                        setName(providerData.name);
                        setLocation(providerData.location);
                        setOpeningTime(providerData.opening_time);
                        setClosingTime(providerData.closing_time);
                        setProfilePicture(providerData.profile_picture);
                        setCoverPicture(providerData.cover_picture);
                    }
                }
                    setLoadProvider(false);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
        };
        fetchData();
    }, [user.isProvider, serviceData, providerData, staffData, loading]);

    const updateProviderInfo = () => {
        if (!name || !location || !openingTime || !closingTime || !profilePicture || !profilePicture) {
            window.alert('Please fill in all input fields.');
            return;
        }

        if (openingTime >= closingTime) {
            window.alert('Opening time must be earlier than closing time.');
            return;
        }

        const shouldUpdate = window.confirm('Are you sure you want to update provider information?');

        if (shouldUpdate) {
            const providerData = {
                uid: uid,
                name: name,
                location: location,
                opening_time: openingTime,
                closing_time: closingTime,
                profile_picture: profilePicture,
                cover_picture: coverPicture,
            };

            window.alert('Successfully updated provider.');
            dataSender.updateServiceProviderData(providerData, currentProvider.uid).then(() => {
                console.log('Provider information updated.');
            });
            setLoadProvider(true);
        }
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64Image = await dataSender.convertImageToBase64(file);
                setProfilePicture(base64Image);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    const getServiceNameById = (serviceId) => {
        const service = serviceData.find((service) => service.id === serviceId);
        return service ? service.name : 'Unknown';
    };

    const addNewStaff = (providerId) => {
        navigate(`/add-staff/${providerId}`);
    };

    const addNewService = (providerId) => {
        navigate(`/add-service/${providerId}`);
    };

    const handleStaffSelection = (providerId, staffUid) => {
        navigate(`/staff-management/${providerId}/${staffUid}`);
    };

    const handleServiceSelection = (providerId, serviceId) => {
        navigate(`/service-management/${providerId}/${serviceId}`);
    };

    const deleteStaffSelection = (staffUid) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this staff member?');
        if (shouldDelete) {
            dataSender.deleteStaff(staffUid);
            window.alert('Successfully deleted staff.');
            navigate(`/provider-management`);
        }
    };

    const deleteServiceSelection = (serviceId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this service?');
        if (shouldDelete) {
            dataSender.deleteService(serviceId);
            window.alert('Successfully deleted service.');
            navigate(`/provider-management`);
        }
    };

    return (
        <div className="provider-management">
            <h2 className="provider-title">Provider Management</h2>
            {loading ? (
                <h2 className="provider-loading">Loading...</h2>
            ) : (
                <>
                        <Panel 
                            className="provider-information"
                            header={<h3 className="provider-title">INFORMATION</h3>}
                            >
                            <div className="provider-content-container">
                                <div className="provider-picture-container">
                                    <h5>Profile picture</h5>
                                    <img
                                        src={profilePicture}
                                        alt="Profile Picture"
                                        className="provider-custom-picture"
                                    />
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={uploadImage}
                                    />
                                </div>
                                <div className="provider-input-container">
                                    <div className="provider-input-field">
                                        <h5>Name</h5>
                                        <Input
                                            className="provider-custom-input"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(value) => setName(value)}
                                        />
                                    </div>
                                    <div className="provider-input-field">
                                        <h5>Location</h5>
                                        <Input
                                            className="provider-custom-input"
                                            placeholder="Location"
                                            value={location}
                                            onChange={(value) => setLocation(value)}
                                        />
                                    </div>
                                    <div className="provider-input-field">
                                        <h5>Open Time</h5>
                                        <Input
                                            className="provider-custom-input"
                                            type="time"
                                            placeholder="Opening Time"
                                            value={openingTime}
                                            onChange={(value) => setOpeningTime(value)}
                                        />
                                    </div>
                                    <div className="provider-input-field">
                                        <h5>Close Time</h5>
                                        <Input
                                            className="provider-custom-input"
                                            type="time"
                                            placeholder="Closing Time"
                                            value={closingTime}
                                            onChange={(value) => setClosingTime(value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <Button
                                className="provider-add-button"
                                appearance="primary"
                                onClick={updateProviderInfo}>
                                Update Information
                            </Button>
                        </Panel>

                    <Panel
                        className="staff-container"
                        header={<h3 className="provider-title">STAFF IN THIS PROVIDER</h3>}
                    >
                        <Table
                            data={staffData}
                            autoHeight
                            width={1000}
                        >
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Staff name</Table.HeaderCell>
                                <Table.Cell dataKey="name" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Specialty</Table.HeaderCell>
                                <Table.Cell dataKey="specialty" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Service</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => (
                                            <p>
                                                {getServiceNameById(rowData.service)}
                                            </p>
                                        )}
                                    </Table.Cell>
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Update</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            className="provider-update-button"
                                            onClick={() => handleStaffSelection(currentProvider.uid, rowData.uid)}>
                                            Update
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            className="provider-delete-button"
                                            onClick={() => deleteStaffSelection(rowData.uid)}>
                                            Delete
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                        <br />
                        <Button
                            className="provider-add-button"
                            appearance="primary"
                            onClick={() => addNewStaff(currentProvider.uid)}>
                            Add Staff
                        </Button>
                    </Panel>

                    <Panel
                        className="service-container"
                        header={<h3 className="provider-title">SERVICE IN THIS PROVIDER</h3>}
                    >
                        <Table
                            data={serviceData}
                            autoHeight
                            width={1000}
                        >
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Service name</Table.HeaderCell>
                                <Table.Cell dataKey="name" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Service duration</Table.HeaderCell>
                                <Table.Cell dataKey="duration" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Service price</Table.HeaderCell>
                                <Table.Cell dataKey="price" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Update</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            className="provider-update-button"
                                            onClick={() => handleServiceSelection(currentProvider.uid, rowData.id)}>
                                            Update
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            className="provider-delete-button"
                                            onClick={() => deleteServiceSelection(rowData.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                        <br />
                        <Button
                            className="provider-add-button"
                            appearance="primary"
                            onClick={() => addNewService(currentProvider.uid)}>
                            Add Service
                        </Button>
                    </Panel>
                </>
            )}
        </div>
    );
};

export default ProviderManagement;

