import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addBooking } from "../bookingsSlice";
import { Overlay } from "react-portal-overlay";
import styles from "./addBooking.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faIdCard } from "@fortawesome/free-solid-svg-icons";

const AddBookingForm: React.FC<{
  isModalOpen: boolean;
  onModalClose: () => void;
  onSubmit: () => void;
}> = ({ isModalOpen, onModalClose, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [paymentType, setPaymentType] = useState("cash");

  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  const handleNameChange = useCallback(
    (event) => setName(event.target.value),
    []
  );
  const handlePaymentTypeChange = useCallback(
    (event) => setPaymentType(event.target.value),
    []
  );
  const handleFormSubmit = useCallback(() => onSubmit(), [onSubmit]);

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
          width: "25%",
          background: "white",
          padding: "2rem",
          borderRadius: "5px",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <h1>Add booking</h1>
          <label>
            Name:
            <input
              className={`${styles["form-input"]} ${styles["name-input"]}`}
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <div
            className={`${styles["form-input"]} ${styles["payment-type-input"]}`}
            key={paymentType}
          >
            Payment:
            <span>
              <div className={styles["radio"]}>
                <label>
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentType === "cash"}
                    onChange={handlePaymentTypeChange}
                  />
                  <FontAwesomeIcon icon={faMoneyBill} /> Cash
                </label>
              </div>
              <div className={styles["radio"]}>
                <label>
                  <input
                    type="radio"
                    value="visa"
                    checked={paymentType === "visa"}
                    onChange={handlePaymentTypeChange}
                  />
                  <FontAwesomeIcon icon={faIdCard} /> Visa
                </label>
              </div>
            </span>
          </div>
        </form>

        <button className={styles["btn-default"]} type="submit">
          Add
        </button>
      </div>
    </Overlay>
  );
};

const mapDispatchToProps = {
  addBooking,
};

export default connect(null, mapDispatchToProps)(AddBookingForm);
