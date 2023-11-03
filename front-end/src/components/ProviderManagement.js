import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Table } from 'rsuite';
import DataSender from './DataSender';
import { useNavigate } from 'react-router-dom';

const ProviderManagement = ({ user, providerData, staffData }) => {
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [coverPicture, setCoverPicture] = useState('');
    const [currentProvider, setCurrentProvider] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const dataSender = new DataSender();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isProvider) {
            const userProvider = providerData.find(provider => provider.uid === user.getUID());
            const providerStaffList = staffData.filter(staff => staff.service_provider === user.getUID());

            if (userProvider) {
                setCurrentProvider(userProvider);
                setUid(userProvider.uid);
                setName(userProvider.name);
                setLocation(userProvider.location);
                setOpeningTime(userProvider.opening_time);
                setClosingTime(userProvider.closing_time);
                setProfilePicture(userProvider.profile_picture);
                setCoverPicture(userProvider.cover_picture);
            }
            if (providerStaffList) {
                setStaffList(providerStaffList);
            }
        }
    }, [user.isProvider, user.id, providerData, staffData]);

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

    const deleteStaffSelection = (staffUid) => {
        dataSender.deleteStaff(staffUid);
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
        </div>
    );
};

export default ProviderManagement;

