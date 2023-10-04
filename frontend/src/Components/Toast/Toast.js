import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = ({   
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export default function ShowToast ({ type, message }) {
    switch (type) {
        case 'success':
            toast.success(message, style);
            break;
        case 'warn':
            toast.warn(message, style);
            break;
        case 'error':
            toast.error(message, style);
            break;
        default:
            toast.info(message, style);
    }
};
