import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Table, Loader } from 'rsuite';
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';
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
    const [updateData, setUpdateData] = useState(true);

    const [staffList, setStaffList] = useState([]);
    const [serviceList, setServiceList] = useState([]);

    const [serviceData, setServiceData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    const [loading, setLoading] = useState(true);

    const dataSender = new DataSender();
    const navigate = useNavigate();
    const dataFetcher = new DataFetcher();

    useEffect(() => {
        if (updateData) {
            try {
                const fetchData = async () => {
                    const serviceData = await dataFetcher.getServiceByServiceProvider(user.getUID());
                    const providerData = await dataFetcher.getServiceProviderData(user.getUID());
                    const staffData = await dataFetcher.getStaffByServiceProvider(user.getUID());

                    setServiceData(serviceData);
                    setProviderData(providerData);
                    setStaffData(staffData);

                    if (user.isProvider) {
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
                        if (staffData) {
                            setStaffList(staffData);
                        }
                        if (serviceData) {
                            setServiceList(serviceData);
                        }
                    }

                    setLoading(false);
                    setUpdateData(false);
                };
                fetchData();
            } catch (error) {
                console.error(error);
                setLoading(false);
                setUpdateData(false);
            }
        }
    }, [user.isProvider, user.id, providerData, staffData, serviceData]);

    const updateProviderInfo = () => {
        const providerData = {
            uid,
            name,
            location,
            openingTime,
            closingTime,
            profile_picture: profilePicture,
            coverPicture,
        };

        dataSender.updateServiceProviderData(providerData, currentProvider.uid).then(() => {
            console.log('Provider information updated.');
        });
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
            setUpdateData(false);
            navigate(`/provider-management`);
        }
    };

    const deleteServiceSelection = (serviceId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this service?');
        if (shouldDelete) {
            dataSender.deleteService(serviceId);
            setUpdateData(false);
            navigate(`/provider-management`);
        }
    };

    return (
        <div className="ProviderManagement">
            {loading ? (
                <Loader center content="Loading..." vertical />
            ) : (
                <>
                    <Panel header="Provider Management">
                        <h3>Current Provider Information</h3>
                        <img src={profilePicture} alt="Profile Picture" />
                        <div>
                            <label>Profile Picture</label>
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
                            placeholder="Location"
                            value={location}
                            onChange={(value) => setLocation(value)}
                        />
                        <Input
                            placeholder="Opening Time"
                            value={openingTime}
                            onChange={(value) => setOpeningTime(value)}
                        />
                        <Input
                            placeholder="Closing Time"
                            value={closingTime}
                            onChange={(value) => setClosingTime(value)}
                        />
                        <Button appearance="primary" onClick={updateProviderInfo}>
                            Update Information
                        </Button>
                    </Panel>

                    <Panel header="Staff Management">
                        <Table
                            data={staffList}
                            autoHeight
                            width={1000}
                        >
                            <Table.Column width={200}>
                                <Table.HeaderCell>Staff Name</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <p>
                                            {rowData.name}
                                        </p>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Specialty</Table.HeaderCell>
                                <Table.Cell dataKey="specialty" />
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Specialty</Table.HeaderCell>
                                <Table.Cell dataKey="service" />
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Update</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <button onClick={() => handleStaffSelection(rowData.uid)}>
                                            Update
                                        </button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <button onClick={() => deleteStaffSelection(rowData.uid)}>
                                            Delete
                                        </button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>
                        <Button appearance="primary" onClick={() => addNewStaff(currentProvider.uid)}>
                            Add Staff
                        </Button>
                    </Panel>

                    <Panel header="Service of Venues">
                        <Table
                            data={serviceList}
                            autoHeight
                            width={1000}
                        >
                            <Table.Column width={200}>
                                <Table.HeaderCell>Service Name</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <p>
                                            {rowData.name}
                                        </p>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Service duration</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <p>
                                            {rowData.duration}
                                        </p>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Service price</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <p>
                                            {rowData.price}
                                        </p>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Update</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <button onClick={() => handleServiceSelection(rowData.id)}>
                                            Update
                                        </button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                            <Table.Column width={200}>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                                <Table.Cell>
                                    {rowData => (
                                        <button onClick={() => deleteServiceSelection(rowData.id)}>
                                            Delete
                                        </button>
                                    )}
                                </Table.Cell>
                            </Table.Column>
                        </Table>

                        <Button appearance="primary" onClick={() => addNewService(currentProvider.uid)}>
                            Add Service
                        </Button>
                    </Panel>
                </>
            )}
        </div>
    );
};

export default ProviderManagement;
