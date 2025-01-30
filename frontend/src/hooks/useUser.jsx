import {useState} from "react";
import {useAuth} from "./useAuth.jsx";
import BASE_URL from "../constants/BASE_URL.js";
import {useLocalStorage} from "./useLocalStorage.jsx";

export const useUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch, user} = useAuth();
    const {updateLocalStorage} = useLocalStorage();
    const token = user?.token;

    const updateUser = async (userId, updatedFields) => {
        setIsLoading(true);
        setError(null);
        // console.log(`Inside the updateUser : ${JSON.stringify(updatedFields)} and userId : ${userId}`);

        try {
            const response = await fetch(`${BASE_URL}/user/${userId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedFields),
            })

            const json = await response.json();
            // console.log(`JSON DATA IS : ${json}`)

            if (!response.ok) {
                setIsLoading(false);
                setError(json.message || 'Failed to update user');
            } else {
                updateLocalStorage('user', 'user', json);
                dispatch({type: 'UPDATE_USER', payload: json});
                setIsLoading(false);
                setError(null);
            }

        } catch (err) {
            setIsLoading(false);
            setError('An error occurred while updating the user');
        }
    }

    return {isLoading, error, updateUser};
}