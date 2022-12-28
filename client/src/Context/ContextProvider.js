import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react"
import { useNavigate } from "react-router-dom";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const userToken = localStorage.getItem('userToken');
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {

        if (!userToken) {
            navigate('/');
            return;
        }

        const user = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }

            const { data } = await axios.get('/api/user', config);
            setUser(data);
        }
        user();
    }, [navigate, fetchAgain]);

    return (
        <Context.Provider
            value={{ user, setUser, userToken, fetchAgain, setFetchAgain }}
        >
            {children}
        </Context.Provider>
    )
}
export const ContextState = () => {
    return useContext(Context)
}

export default ContextProvider;