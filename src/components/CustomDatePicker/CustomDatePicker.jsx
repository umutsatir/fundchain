import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './CustomDatePicker.module.css';

const CustomDatePicker = ({ selected, onChange, buttonRef, open }) => {
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      setButtonPosition({
        top: rect.top + scrollTop + rect.height,
        left: rect.left + scrollLeft,
      });
    }
  }, [buttonRef, open]);

  return (
    open &&
    ReactDOM.createPortal(
      <div
        className={styles.datePickerWrapper}
        style={{
          position: 'absolute',
          top: buttonPosition.top + 'px',
          left: buttonPosition.left + 'px',
          zIndex: 1000,
        }}
      >
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="yyyy/MM/dd"
          inline
        />
      </div>,
      document.body
    )
  );
};

export default CustomDatePicker;
