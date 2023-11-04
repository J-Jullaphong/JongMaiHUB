import React, { useState } from 'react';
import { Input, Button, Panel } from 'rsuite';

const CreateNewStaff = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    const handleCreateStaff = () => {
        const newStaff = {
            name,
            duration,
            price,
        };
        setName('');
        setDuration('');
        setPrice('');
    };

    return (
        <Panel header="Create New Staff">
            <Button appearance="primary" onClick={handleCreateStaff}>
                Create Staff
            </Button>
        </Panel>
    );
};

export default CreateNewStaff;
