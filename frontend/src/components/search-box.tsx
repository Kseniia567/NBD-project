import React, {FormEvent, SetStateAction} from "react";
import {Form} from "./form";
import {Input} from "./input";

export const SearchBox = ({
    title, query, setQuery, onSearch
                          }: {
    title: string;
    onSearch: (e: FormEvent<HTMLFormElement>) => void;
    setQuery: (e: SetStateAction<string>) => void;
    query: string;
}) => {

    return (
        <>
            <h2 className={"font-extrabold text-xl "}>{title}</h2>
            <Form onSubmit={onSearch}>
                <Input
                    type= "text"
                    placeholder="Search for recipe"
                    value={query}
                    handleChange= {(e: FormEvent<HTMLInputElement>) => {
                        setQuery(e.currentTarget.value)
                    }}
                    className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm 
        hover:bg-zinc-800 cursor-pointer focus:outline-none my-3
        `} />
            </Form>
        </>
    )
}