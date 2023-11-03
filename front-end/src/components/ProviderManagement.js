import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Table } from 'rsuite';
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';
import { useNavigate } from 'react-router-dom';

const ProviderManagement = ({ user }) => {
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [coverPicture, setCoverPicture] = useState('');
    const [currentProvider, setCurrentProvider] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const [serviceList, setServiceList] = useState([])

    const [serviceData, setServiceData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    
    const dataSender = new DataSender();
    const navigate = useNavigate();
    const dataFetcher = new DataFetcher();
    
    useEffect(() => {
        if (currentProvider === null) {
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
                };
                fetchData();
            } catch (error) {
                console.error(error);
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
            profilePicture,
            coverPicture,
        };

        dataSender.updateServiceProviderData(providerData, currentProvider.uid).then(() => {
            console.log('Provider information updated.');
        });
    };

    const handleStaffSelection = (staffUid) => {
        navigate(`/staff-management/${staffUid}`);
    };

    const handleServiceSelection = ( serviceId) => {
        navigate(`/service-management/${serviceId}`);
    };

    const deleteStaffSelection = (staffUid) => {
        dataSender.deleteStaff(staffUid);
        navigate(`/provider-management`);
    };

    const deleteServiceSelection = (serviceId) => {
        dataSender.deleteService(serviceId);
        navigate(`/provider-management`);
    };
 
    return (
        <div>
            <Panel header="Provider Management">
                <h3>Current Provider Information</h3>
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
            </Panel>
        </div>
    );
};

export default ProviderManagement;

