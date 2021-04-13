import React, {useState, createContext} from "react";

export const HotelContext = createContext(null);

const HotelProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hotels, setHotels] = useState([]);

    const loadHotels = async () => {
        try {
            const data = await fetch('https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels').then(response => response.json());

            if (data) {
                setHotels(data);
            }
        }
        catch (e) {
            setError(e);
        }

        setLoading(false);
    };

    return (
        <HotelContext.Provider
            value={{
                hotels,
                loading,
                error,
                loadHotels
            }}
        >
            {children}
        </HotelContext.Provider>
    );
}

export default HotelProvider;