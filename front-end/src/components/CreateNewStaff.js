import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Panel,
  InputPicker,
  InputGroup
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import DataSender from "./DataSender";
import DataFetcher from "./DataFetcher";
import "./styles/ProviderManagement.css";

const CreateNewStaff = ({ customerData }) => {
  const { providerId } = useParams();
  const [userTag, setUserTag] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [background, setBackground] = useState("");
  const [startWorkTime, setStartWorkTime] = useState("");
  const [getOffWorkTime, setGetOffWorkTime] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [service, setService] = useState("");
  const [selectStaff, setSelectStaff] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [loading, setLoading] = useState(true);
  const dataSender = new DataSender();
  const navigate = useNavigate();
  const dataFetcher = new DataFetcher();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await dataFetcher.getServiceByServiceProvider(
          providerId
        );
        const transformedServiceData = serviceData.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setServiceData(transformedServiceData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serviceData]);

  const checkStaffStatus = async (staffID) => {
    try {
      await dataFetcher.getStaffData(staffID);
      return true;
    } catch (AxiosError) {
      return false;
    }
  };

  const addStaffInfo = async () => {
    if (
      !userTag ||
      !specialty ||
      !background ||
      !startWorkTime ||
      !getOffWorkTime ||
      !profilePicture ||
      !service
    ) {
      window.alert("Please fill in all input fields.");
      return;
    }

    if (specialty.length > 100) {
      window.alert("Staff specialty must less than 100 character.");
      return;
    }

    if (background.length > 100) {
      window.alert("Staff background must less than 500 character.");
      return;
    }

    if (startWorkTime >= getOffWorkTime) {
      window.alert("Start work time must be earlier than get off work time.");
      return;
    }

    const staffUid = queryUidCustomerByUserTag(userTag);
    const staffName = queryNameCustomerByUserTag(userTag);

    try {
      const isStaffExist = await checkStaffStatus(staffUid);
      if (isStaffExist) {
        window.alert("Can't select this staff.");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const shouldAddStaff = window.confirm(
      "Are you sure you want to add this staff member?"
    );
    if (shouldAddStaff) {

      const NewStaffData = {
        uid: staffUid,
        name: staffName,
        specialty: specialty,
        background: background,
        start_work_time: startWorkTime,
        get_off_work_time: getOffWorkTime,
        profile_picture: profilePicture,
        service_provider: providerId,
        service: service,
      };
      window.alert("Successfully added staff.");
      dataSender.submitStaffData(NewStaffData).then(() => {
        navigate("/provider-management");
      });
    }
  };

  const queryUidCustomerByUserTag = (userTag) => {
    const foundCustomer = customerData.find(
      (customer) => customer.uid.slice(-10) === userTag
    );
    return foundCustomer ? foundCustomer.uid : "Not found";
  };

  const queryNameCustomerByUserTag = (userTag) => {
    const foundCustomer = customerData.find(
      (customer) => customer.uid.slice(-10) === userTag
    );
    return foundCustomer ? foundCustomer.name : "Not found";
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const result = queryNameCustomerByUserTag(userTag);
    setSelectStaff(result);
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
    <div className="provider-management">
      <h2 className="provider-title">Add New Staff</h2>
      {loading ? (
        <h2 className="provider-loading">Loading...</h2>
      ) : (
        <>
          <Panel className="provider-information">
            <div className="provider-content-container">
              <div className="provider-picture-container">
                <h5>Profile picture</h5>
                <img
                  src={profilePicture}
                  alt="No profile picture"
                  className="provider-custom-picture"
                />
                <br />
                <input type="file" accept="image/*" onChange={uploadImage} />
              </div>
              <div className="provider-input-container">
                <div className="provider-input-field">
                  <h5>User Tag</h5>
                  <InputGroup>
                    <Input
                      placeholder="Search by last UID"
                      value={userTag}
                      onChange={(value) => setUserTag(value)}
                      onKeyPress={handleEnterKeyPress}
                    />
                    <InputGroup.Button onClick={handleSearch}>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                  {selectStaff && (
                    <Input
                      readOnly
                      style={{ width: 300 }}
                      value={selectStaff}
                    />
                  )}
                </div>
                <div className="provider-input-field">
                  <h5>Service</h5>
                  <InputPicker
                    className="provider-custom-input"
                    data={serviceData}
                    value={service}
                    onChange={(value) => setService(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Specialty</h5>
                  <Input
                    className="provider-custom-input"
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(value) => setSpecialty(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Background</h5>
                  <Input
                    className="provider-custom-input"
                    placeholder="Background"
                    value={background}
                    onChange={(value) => setBackground(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Start work time</h5>
                  <Input
                    className="provider-custom-input"
                    type="time"
                    placeholder="Start work time"
                    value={startWorkTime}
                    onChange={(value) => setStartWorkTime(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Get off work time</h5>
                  <Input
                    className="provider-custom-input"
                    type="time"
                    placeholder="Get off work time"
                    value={getOffWorkTime}
                    onChange={(value) => setGetOffWorkTime(value)}
                  />
                </div>
              </div>
            </div>
            <br />
            <Button appearance="primary" onClick={addStaffInfo}>
              Add new staff
            </Button>
          </Panel>
        </>
      )}
    </div>
  );
};

export default CreateNewStaff;
