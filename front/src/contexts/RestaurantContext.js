import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5004/restaurants"
                );
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error.message);
            }
        };

        fetchRestaurants();
    }, []);

    const handleAddItems = (dish) => {
        // Check if the dish already exists in the cart
        const existingItemIndex = cartItems.findIndex(
            (item) => item._id === dish._id
        );

        if (existingItemIndex !== -1) {
            // If the dish already exists, update the quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + 1,
            };

            setCartItems(updatedCartItems);
        } else {
            // If the dish is not in the cart, add it
            setCartItems([...cartItems, { ...dish, quantity: 1 }]);
        }
        setTotalPrice((prev) => prev + dish.price);
    };

    const handleRemoveItems = (dish) => {
        const existingItemIndex = cartItems.findIndex(
            (item) => item._id === dish._id
        );

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];

            if (updatedCartItems[existingItemIndex].quantity > 1) {
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedCartItems[existingItemIndex].quantity - 1,
                };
            } else {
                updatedCartItems.splice(existingItemIndex, 1);
            }

            setCartItems(updatedCartItems);
            setTotalPrice((prev) => prev - dish.price);
        }
    };

    const value = {
        restaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        handleAddItems,
        handleRemoveItems,
        cartItems,
        totalPrice,
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };
