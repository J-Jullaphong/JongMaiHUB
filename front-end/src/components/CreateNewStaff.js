import React, { useState } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';



const CreateNewStaff = () => {
    const { providerId } = useParams();
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState("12345");
    const [service_provider, setServiceProvider] = useState("");
    const [service, setService] = useState(3);
    const dataSender = new DataSender();


    const addStaffInfo = () => {
        console.log("provider", service_provider)
        console.log("service", service)
        const NewStaffData = {
            uid,
            name,
            specialty,
            background,
            start_work_time: startWorkTime,
            get_off_work_time: getOffWorkTime,
            profile_picture: profilePicture,
            service_provider: providerId,
            service
        };

        dataSender.submitStaffData(NewStaffData).then(() => {
            console.log('Staff information added.');
        });
    };
    return (
        <div>
            <Panel header={`Add new staff`}>
                <h3>Staff Information</h3>
                <Input
                    placeholder="Uid"
                    value={uid}
                    onChange={(value) => setUid(value)}
                />
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                />
                <Input
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(value) => setSpecialty(value)}
                />
                <Input
                    placeholder="Background"
                    value={background}
                    onChange={(value) => setBackground(value)}
                />
                <Input
                    placeholder="Start Work Time"
                    value={startWorkTime}
                    onChange={(value) => setStartWorkTime(value)}
                />
                <Input
                    placeholder="Get Off Work Time"
                    value={getOffWorkTime}
                    onChange={(value) => setGetOffWorkTime(value)}
                />
                <Button appearance="primary" onClick={addStaffInfo}>
                    Add Staff Information
                </Button>
            </Panel>
        </div>
    );
};

export default CreateNewStaff;
