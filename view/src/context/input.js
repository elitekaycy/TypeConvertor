import React, { createContext, useState } from 'react';

// Create the InputContext
const InputContext = createContext();

// Create a provider component for the InputContext
const InputProvider = ({ children }) => {
  const [code, setCode] = useState(`{
        "name": "John Doe",
        "age": 30,
        "email": "johndoe@example.com",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "postalCode": "10001"
        },
        "skills": [
            "JavaScript", "React", "Node.js"
        ],
        "isActive": true
    }`);

  return (
    <InputContext.Provider value={{ code, setCode }}>
      {children}
    </InputContext.Provider>
  );
};

export { InputProvider, InputContext };
