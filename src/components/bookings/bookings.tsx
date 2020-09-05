import React from "react";
import styles from "./bookings.module.scss";

interface BookingsProps {
  bookings?: Array<{ name: string; seatNumber: number; status?: string }>;
}

export const Bookings: React.FC<BookingsProps> = ({ bookings }) => {
  const bookingsElements = bookings?.map((booking) => (
    <div className={styles["bookings__customer"]}>
      <div className={styles["name"]}>{booking.name}</div>
      <div className={styles["ride-data"]}>
        {booking.seatNumber} {booking.status}
      </div>
    </div>
  ));
  return (
    <>
      <h1>Bookings</h1>
      <div className={styles["bookings"]}>{bookingsElements}</div>
    </>
  );
};
