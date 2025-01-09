import React, { FormEvent } from "react";

export const Input = ({
                          type,
                          placeholder,
                          handleChange,
                          className,
                          error,
                          ...rest
                      }: {
    type: string;
    placeholder: string;
    handleChange: (e: FormEvent<HTMLInputElement>) => void;
    className: string;
    [key: string]: unknown;
    error?: string;
}) => {
    return (
        <div>
            <input
                {...rest}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                className={`${className} ${error ? 'border-2 border-red-500' : ''}`}
            />
            {error && (
                <p className="absolute text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
};