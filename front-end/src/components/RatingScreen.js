import React, { useEffect, useState } from "react";
import { Modal, Star, Button, Rate } from "rsuite";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";

const RatingScreen = ({ appointmentId }) => {
  const [rating, setRating] = useState(2.5);
  const [ratingState, setRatingState] = useState(1);
  const dataSender = new DataSender();

  console.log("Appointment ID",appointmentId )


  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleSubmitRating = async () => {
  const formattedRating = rating.toFixed(1);
  const formData = {
    appointment: appointmentId,
    rating: formattedRating,
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


  const displayStateOne = () => {
    return (
      <div>
        <Rate
          defaultValue={rating}
          allowHalf
          onChange={handleRatingChange}
          value={rating}
        />
        {createFooter()}
      </div>
    );
  };

  const displayStateTwo = () => {
    return (
      <div>
        <h3>Your Rating has been recorded.</h3>
        <h4>You may close this window.</h4>
        {createFooter()}
      </div>
    );
  };

  const createFooter = () => {
    let content;
    if (ratingState === 1) {
      content = <button onClick={handleSubmitRating}>Rate</button>;
    } else if (ratingState === 2) {
      content = null;
    }
    return <Modal.Footer>{content}</Modal.Footer>;
  };

  const display = () => {
    if (ratingState === 1) return displayStateOne();
    else if (ratingState === 2) return displayStateTwo();
  };

  useEffect(() => {
    display();
  }, [ratingState]);

  return display();
};
export default RatingScreen;
