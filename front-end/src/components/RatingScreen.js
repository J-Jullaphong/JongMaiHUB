import React, { useEffect, useState } from "react";
import { Modal, Button, Rate } from "rsuite";
import DataSender from "./DataSender";
import FrownIcon from "@rsuite/icons/legacy/FrownO";
import MehIcon from "@rsuite/icons/legacy/MehO";
import SmileIcon from "@rsuite/icons/legacy/SmileO";

const RatingScreen = ({ appointmentId }) => {
  const [rating1, setRating1] = useState(2.5);
  const [rating2, setRating2] = useState(2.5);
  const [rating3, setRating3] = useState(2.5);
  const [ratingState, setRatingState] = useState(1);
  const dataSender = new DataSender();

  const handleRatingChange = (rating, setRating) => {
    setRating(rating);
  };

  const handleSubmitRating = async () => {
    const averageRating = ((rating1 + rating2 + rating3) / 3).toFixed(1);
    const formData = {
      appointment: appointmentId,
      rating: averageRating,
    };

    try {
      await dataSender.submitRatingData(formData);
      console.log("Rating submitted successfully.");
      setRatingState(2);
    } catch (error) {
      console.error("Error submitting rating:", error);
      try {
        await dataSender.updateRatingData(formData, appointmentId);
        console.log("Rating data updated successfully.");
        setRatingState(2);
      } catch (updateError) {
        console.error("Error updating rating data:", updateError);
      }
    }
  };

  const renderCharacter = (value, index) => {
    if (value < index + 0.5) {
      return <MehIcon style={{ color: "#ffd400" }} />;
    }
    if (value < 2.5) {
      return <FrownIcon style={{ color: "#ff6961" }} />;
    }
    if (value < 4) {
      return <MehIcon style={{ color: "#ffd400" }} />;
    }
    return <SmileIcon style={{ color: "#77dd77" }} />;
  };

  const createFooter = () => {
    return (
      <Modal.Footer>
        <Button onClick={handleSubmitRating}>Rate</Button>
      </Modal.Footer>
    );
  };

  const displayStateOne = (rating, setRating, label) => {
    return (
      <div>
        <h4>{label}</h4>
        <Rate
          defaultValue={rating}
          allowHalf
          onChange={(value) => handleRatingChange(value, setRating)}
          value={rating}
          renderCharacter={renderCharacter}
        />
      </div>
    );
  };

  const displayStateTwo = () => {
    return (
      <div>
        <h3>Your Ratings have been recorded.</h3>
        <h4>You may close this window.</h4>
      </div>
    );
  };

  const display = () => {
    if (ratingState === 1)
      return (
        <div>
          {displayStateOne(rating1, setRating1, "Service")}
          {displayStateOne(rating2, setRating2, "Staff")}
          {displayStateOne(rating3, setRating3, "Something Related")}
          {createFooter()}
        </div>
      );
    else if (ratingState === 2) return displayStateTwo();
  };

  useEffect(() => {
    display();
  }, [ratingState]);

  return display();
};

export default RatingScreen;
