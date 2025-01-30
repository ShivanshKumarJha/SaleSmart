import AddIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";

const ActionButton = ({onClick, children, isMobile = false}) => (
    <button
        onClick={onClick}
        className={`${
            isMobile ? 'md:hidden' : 'hidden md:flex'
        } items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer`}
    >
        <AddIcon fontSize="medium"/>
        <span className='font-medium'>{children}</span>
    </button>
);

export default ActionButton;