import {Sort, Tune} from "@mui/icons-material";
import React from "react";

const SearchControls = ({setQuery}) => (
    <div className="relative w-full max-w-2xl">
        <input
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-28 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-200 transition-colors"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <Tune className="text-gray-600" fontSize="small"/>
            </button>
            <div className="h-6 w-px bg-gray-200 my-auto"></div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <Sort className="text-gray-600" fontSize="small"/>
            </button>
        </div>
    </div>
);

export default SearchControls;