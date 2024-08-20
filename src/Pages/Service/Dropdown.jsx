import React, { useState } from 'react'

export const Dropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative w-full">
        <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>
        <div
          className="w-full shadow appearance-none border border-black focus:border-yellow-500 rounded py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? options.find(opt => opt.value === value)?.label : 'Select a spare'}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-black rounded shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2 cursor-pointer hover:bg-gray-600"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
 