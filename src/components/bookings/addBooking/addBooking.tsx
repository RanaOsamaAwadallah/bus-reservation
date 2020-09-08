import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addBooking } from "../bookingsSlice";
import { Overlay } from "react-portal-overlay";

const AddBookingForm: React.FC<{
  isModalOpen: boolean;
  onModalClose: () => void;
}> = ({ isModalOpen, onModalClose }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  return (
    <Overlay
      open={open}
      onClose={() => {
        onModalClose();
        setOpen(false);
      }}
      closeOnClick
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          background: "white",
          padding: "2rem",
          borderRadius: "5px",
        }}
      >
        <h1>Modal</h1>
      </div>
    </Overlay>
  );
};

const mapDispatchToProps = {
  addBooking,
};

export default connect(null, mapDispatchToProps)(AddBookingForm);
