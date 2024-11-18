import React, { useState } from "react";

const useLocalStorage = (currentUser) => {
    const [currUser, setCurrUser] = useState(currentUser);
    const updateCurrUser = (newUser) => {
        setCurrUser(newUser);
        localStorage.setItem('currUser', JSON.stringify(newUser));
    };
    
    return [currUser, updateCurrUser]
}

export { useLocalStorage };