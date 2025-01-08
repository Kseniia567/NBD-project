import {FormEvent} from "react";

export const TextArea = ({placeholder, onChange, className, rows, ...rest}: {
    placeholder: string;
    onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
    className: string;
    rows: number;
    [key: string]: unknown;
}) => {
    return <textarea
    {...rest}
    placeholder={placeholder}
    className={`${className}`}
    rows={rows}
    onChange = {onChange} />
}