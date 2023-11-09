import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Table, Loader } from 'rsuite';
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';
import "./styles/ProviderManagement.css";
import { useNavigate } from 'react-router-dom';

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
        try {
            const fetchData = async () => {
                const serviceData = await dataFetcher.getServiceByServiceProvider(user.getUID());
                const providerData = await dataFetcher.getServiceProviderData(user.getUID());
                const staffData = await dataFetcher.getStaffByServiceProvider(user.getUID());

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
            };
            fetchData();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [user.isProvider, serviceData, providerData, staffData, loading]);

    const updateProviderInfo = () => {
        if (!name || !location || !openingTime || !closingTime || !profilePicture || !profilePicture) {
            window.alert('Please fill in all input fields.');
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

    const addNewStaff = (providerId) => {
        navigate(`/add-staff/${providerId}`);
    };

    const addNewService = (providerId) => {
        navigate(`/add-service/${providerId}`);
    };

    const handleStaffSelection = (staffUid) => {
        navigate(`/staff-management/${staffUid}`);
    };

    const handleServiceSelection = (serviceId) => {
        navigate(`/service-management/${serviceId}`);
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
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <Panel
                        className="provider-information"
                        header={<h3>Current Provider Information</h3>}
                    >
                        <div className="input-fields">
                            <div>
                                <h5>Profile picture</h5>
                                <img
                                    src={profilePicture}
                                    alt="Profile Picture"
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
                            <div className="input-flied">
                                <h5>Name</h5>
                                <Input
                                    className="custom-input"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(value) => setName(value)}
                                />
                            </div>
                            <div className="input-flied">
                                <h5>Location</h5>
                                <Input
                                    className="custom-input"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(value) => setLocation(value)}
                                />
                            </div>
                            <div className="input-flied">
                                <h5>Open Time</h5>
                                <Input
                                    className="custom-input"
                                    type="time"
                                    placeholder="Opening Time"
                                    value={openingTime}
                                    onChange={(value) => setOpeningTime(value)}
                                />
                            </div>
                            <div className="input-flied">
                                <h5>Close Time</h5>
                                <Input
                                    className="custom-input"
                                    type="time"
                                    placeholder="Closing Time"
                                    value={closingTime}
                                    onChange={(value) => setClosingTime(value)}
                                />
                            </div>
                        </div>
                        <br />
                        <Button
                            className="add-button"
                            appearance="primary"
                            onClick={updateProviderInfo}>
                            Update Information
                        </Button>
                    </Panel>

                    <Panel
                        className="staff-container"
                        header={<h3>Staff in this provider</h3>}
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
                                <Table.Cell dataKey="service" />
                            </Table.Column>
                            <Table.Column
                                width={200}
                                align="center">
                                <Table.HeaderCell>Update</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <Button
                                            className="update-button"
                                            onClick={() => handleStaffSelection(rowData.uid)}>
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
                                            className="delete-button"
                                            onClick={() => deleteStaffSelection(rowData.uid)}>
                                            Delete
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                        <br />
                        <Button
                            className="add-button"
                            appearance="primary"
                            onClick={() => addNewStaff(currentProvider.uid)}>
                            Add Staff
                        </Button>
                    </Panel>

                    <Panel
                        className="service-container"
                        header={<h3>Service in this provider</h3>}
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
                                            className="update-button"
                                            onClick={() => handleServiceSelection(rowData.id)}>
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
                                            className="delete-button"
                                            onClick={() => deleteServiceSelection(rowData.id)}>
                                            Delete
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                        <br />
                        <Button
                            className="add-button"
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

