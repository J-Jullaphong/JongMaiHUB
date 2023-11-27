import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Panel, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import DataSender from "./DataSender";
import DataFetcher from "./DataFetcher";
import "./styles/ProviderManagement.css";

const CreateProviderScreen = () => {
  const [userTag, setUserTag] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [providerName, setProviderName] = useState("");
  const [providerLocation, setProviderLocation] = useState("");
  const [providerOpeningTime, setProviderOpeningTime] = useState("");
  const [providerClosingTime, setProviderClosingTime] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectProvider, setSelectProvider] = useState([]);
  const dataSender = new DataSender();
  const dataFetcher = new DataFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await dataFetcher.getCustomerData();
        setCustomerData(customerData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [customerData]);

  const getUidCustomerByUserTag = (userTag) => {
    const foundCustomer = customerData.find(
      (customer) => customer.uid.slice(-10) === userTag
    );
    return foundCustomer ? foundCustomer.uid : "Not found";
  };

  const getNameCustomerByUserTag = (userTag) => {
    const foundCustomer = customerData.find(
      (customer) => customer.uid.slice(-10) === userTag
    );
    return foundCustomer ? foundCustomer.name : "Not found";
  };

  const customerUid = getUidCustomerByUserTag(userTag);

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

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const result = getNameCustomerByUserTag(userTag);
    setSelectProvider(result);
  };

  const addProviderInfo = () => {
    console.log(customerUid)
    console.log(providerName)
    console.log(providerLocation)
    console.log(providerOpeningTime)
    console.log(providerClosingTime)
    if (
      !customerUid ||
      !providerLocation ||
      !providerOpeningTime ||
      !providerClosingTime ||
      !profilePicture
    ) {
      window.alert("Please fill in all input fields.");
      return;
    }

    const shouldAddProvider = window.confirm(
      "Are you sure you want to add this service provider?"
    );

    if (shouldAddProvider) {
      const newProviderData = {
        uid: customerUid,
        name: providerName,
        location: providerLocation,
        opening_time: providerOpeningTime,
        closing_time: providerClosingTime,
        profile_picture: profilePicture,
        cover_picture : profilePicture,
      };
      window.alert("Successfully added service provider.");
      dataSender.submitServiceProviderData(newProviderData).then(() => {
        navigate("/");
      });
    }
  };
  
  return (
    <div className="provider-management">
      <h2 className="provider-title">Add New Provider</h2>
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
                      placeholder="Search by user tag"
                      value={userTag}
                      onChange={(value) => setUserTag(value)}
                      onKeyPress={handleEnterKeyPress}
                    />
                    <InputGroup.Button onClick={handleSearch}>
                      <SearchIcon />
                    </InputGroup.Button>
                  </InputGroup>
                  {selectProvider && (
                    <Input
                      readOnly
                      style={{ width: 300 }}
                      value={selectProvider}
                    />
                  )}
                </div>
                <div className="provider-input-field">
                  <h5>Name</h5>
                  <Input
                    className="provider-custom-input"
                    placeholder="Provider Name"
                    value={providerName}
                    onChange={(value) => setProviderName(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Location</h5>
                  <Input
                    className="provider-custom-input"
                    placeholder="Location"
                    value={providerLocation}
                    onChange={(value) => setProviderLocation(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Opening Time</h5>
                  <Input
                    className="provider-custom-input"
                    type="time"
                    placeholder="Opening time"
                    value={providerOpeningTime}
                    onChange={(value) => setProviderOpeningTime(value)}
                  />
                </div>
                <div className="provider-input-field">
                  <h5>Closing Time</h5>
                  <Input
                    className="provider-custom-input"
                    type="time"
                    placeholder="Closing time"
                    value={providerClosingTime}
                    onChange={(value) => setProviderClosingTime(value)}
                  />
                </div>
              </div>
            </div>
            <br />
            <Button appearance="primary" onClick={addProviderInfo}>
              Add new provider
            </Button>
          </Panel>
        </>
      )}
    </div>
  );
};

export default CreateProviderScreen;