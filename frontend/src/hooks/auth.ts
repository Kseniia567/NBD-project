import {useState} from "react";
import {instance} from "../config";
import {ILOGINRESPONSE} from "../@types";

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const login = async(payload: {email: string, password: string}): Promise<ILOGINRESPONSE | void> => {
        try{
            setLoading(true);
            const response =await instance.post("/auth/join", payload);
            if (response) {
                console.log("No error")
                return response?.data;
            }
        } catch(error) {
            console.log("Error error")
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {loading, login};
};