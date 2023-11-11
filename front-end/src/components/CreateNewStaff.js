import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, InputPicker } from 'rsuite';
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';
import "./styles/InputButton.css";
import { useParams, useNavigate } from 'react-router-dom';

const CreateNewStaff = ({ customerData }) => {
    const { providerId } = useParams();
    const [uid, setUid] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [service, setService] = useState('');
    const [selectStaff, setSelectStaff] = useState('');
    const [serviceData, setServiceData] = useState('');
    const dataSender = new DataSender();
    const navigate = useNavigate();
    const dataFetcher = new DataFetcher();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const serviceData = await dataFetcher.getServiceByServiceProvider(providerId);
                const transformedServiceData = serviceData.map(item => ({ label: item.name, value: item.id }));
                const transformedSelectStaff = customerData.map(item => ({ label: item.name, value: item.uid }));
                setServiceData(transformedServiceData);
                setSelectStaff(transformedSelectStaff);
            };
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, [serviceData]);

    const addStaffInfo = () => {
        if (!uid || !specialty || !background || !startWorkTime || !getOffWorkTime || !profilePicture || !service) {
            console.log("uid",  uid)
            console.log("service", service)
            window.alert('Please fill in all input fields.');
            return;
        }
        const shouldAddStaff = window.confirm('Are you sure you want to add this staff member?');
        if (shouldAddStaff) {
            const NewStaffData = {
                uid: uid,
                name: getNameByUid(uid),
                specialty: specialty,
                background: background,
                start_work_time: startWorkTime,
                get_off_work_time: getOffWorkTime,
                profile_picture: profilePicture,
                service_provider: providerId,
                service: service,
            };
            window.alert('Successfully added staff.');
            dataSender.submitStaffData(NewStaffData).then(() => {
                console.log('Staff information added.');
                navigate('/provider-management');
            });
        }
    };

    const getNameByUid = (customerUid) => {
        const customer = customerData.find(customer => customer.uid === customerUid);
        return customer ? customer.name : "";
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

    return (
        <div>
            <Panel header={<h3>Add new staff</h3>}>
                <div>
                    <h5>Profile Picture: </h5>
                    <img 
                        src={profilePicture} 
                        alt="No profile picture" 
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
                    <InputPicker
                        className="custom-input"
                        data={selectStaff}
                        value={uid}
                        onChange={(value) => setUid(value)}
                    />
                </div>
                <div>
                    <h5>Service: </h5>
                    <InputPicker
                        className="custom-input"
                        data={serviceData}
                        value={service}
                        onChange={(value) => setService(value)}
                    />
                </div>
                <div>
                    <h5>Specialty: </h5>
                    <Input
                        className="custom-input"
                        placeholder="Specialty"
                        value={specialty}
                        onChange={(value) => setSpecialty(value)}
                    />
                </div>
                <div>
                    <h5>Background: </h5>
                    <Input
                        className="custom-input"
                        placeholder="Background"
                        value={background}
                        onChange={(value) => setBackground(value)}
                    />
                </div>
                <div>
                    <h5>Start work time: </h5>
                    <Input
                        className="custom-input"
                        type="time"
                        placeholder="Start work time"
                        value={startWorkTime}
                        onChange={(value) => setStartWorkTime(value)}
                    />
                </div>
                <div>
                    <h5>Get off work time: </h5>
                    <Input
                        className="custom-input"
                        type="time"
                        placeholder="Get off work time"
                        value={getOffWorkTime}
                        onChange={(value) => setGetOffWorkTime(value)}
                    />
                </div>
                <Button appearance="primary" onClick={addStaffInfo}>
                    Add new staff
                </Button>
            </Panel>
        </div>
    );
};

export default CreateNewStaff;

