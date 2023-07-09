import React, { createContext, useState } from 'react';

// Create the InputContext
const outputContext = createContext();

// Create a provider component for the InputContext
const OutputProvider = ({ children }) => {
  const [output, setOutput] = useState(`type Person = {
        name: string;
        age: number;
        email: string;
        address: {
          street: string;
          city: string;
          state: string;
          postalCode: string;
        };
        skills: string[];
        isActive: boolean;
      };
      `);

  return (
    <outputContext.Provider value={{ output, setOutput }}>
      {children}
    </outputContext.Provider>
  );
};

export { OutputProvider, outputContext };
