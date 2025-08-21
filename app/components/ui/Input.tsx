// MARK: - 공통 Input 컴포넌트

import { colors } from "~/constants";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, required, ...props }: InputProps) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={props.id}
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.text.BLACK }}
                >
                    {label}{required && '*'}
                </label>
            )}
            <input
                {...props}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${props.className || ''}`}
                style={{
                    backgroundColor: colors.bg.INPUTFIELD,
                    borderColor: error ? colors.button.DELETE : '#E5E5E5',
                    color: colors.text.BLACK,
                    ...props.style
                }}
            />
            {error && (
                <p className="mt-1 text-xs" style={{ color: colors.button.DELETE }}>
                    {error}
                </p>
            )}
        </div>
    );
}
