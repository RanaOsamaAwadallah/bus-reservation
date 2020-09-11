import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addBooking, PaymentMethod } from "../bookingsSlice";
import { Overlay } from "react-portal-overlay";
import styles from "./addBooking.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { Booking } from "../bookingsSlice";

const AddBookingForm: React.FC<{
  isModalOpen: boolean;
  addBooking: (booking: Booking) => void;
  onModalClose: () => void;
}> = ({ isModalOpen, onModalClose, addBooking }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentType] = useState(PaymentMethod.CASH);

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
  const closeModal = useCallback(() => {
    onModalClose();
    setOpen(false);
    setName("");
    setPaymentType(PaymentMethod.CASH);
  }, [onModalClose]);
  const handleFormSubmit = useCallback(
    (event) => {
      addBooking({ name, paymentMethod });
      closeModal();
    },
    [addBooking, closeModal, name, paymentMethod]
  );

  return (
    <Overlay
      key={isModalOpen ? 1 : 0}
      open={open}
      onClose={() => {
        closeModal();
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
        <form>
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
            key={paymentMethod}
          >
            Payment:
            <span>
              <div className={styles["radio"]}>
                <label>
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
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
                    checked={paymentMethod === "visa"}
                    onChange={handlePaymentTypeChange}
                  />
                  <FontAwesomeIcon icon={faIdCard} /> Visa
                </label>
              </div>
            </span>
          </div>
        </form>

        <button
          className={styles["btn-default"]}
          onClick={handleFormSubmit}
          disabled={!name}
        >
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
