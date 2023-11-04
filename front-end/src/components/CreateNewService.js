import React, { useState } from 'react';
import { Input, Button, Panel } from 'rsuite';

const CreateNewService = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');

    const handleCreateService = () => {
        const newService = {
            name,
            duration,
            price,
        };
        setName('');
        setDuration('');
        setPrice('');
    };

    return (
        <Panel header="Create New Service">
            <Button appearance="primary" onClick={handleCreateService}>
                Create Service
            </Button>
        </Panel>
    );
};

export default CreateNewService;
