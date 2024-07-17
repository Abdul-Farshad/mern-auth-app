import { useEffect } from "react";
import './alertPopup.css'
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

const AlertPopup = ({
  title,
  text,
  icon,
  showCancelButton = true,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    const showAlert = async () => {
      const result = await Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: showCancelButton,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
          popup: "small-swal-popup",
          icon: "small-swal-icon",
          content: "swal2-content",
          confirmButton: "small-swal-button",
          cancelButton: "small-swal-button",
        },
      });

      if (result.isConfirmed && onConfirm) {
        onConfirm();
      } else if (onClose) {
        onClose();
      }
    };

    showAlert();
  }, [title, text, icon, showCancelButton, confirmButtonText, cancelButtonText, onConfirm, onClose]);

  return null;
};

export default AlertPopup;
