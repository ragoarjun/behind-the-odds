import api from "./api";

export const getRecoveryData = async () => {

    const response = await api.get("/recovery");

    return response.data;

};

export const startBreak = async (days) => {

    const response = await api.post(

        "/recovery/start-break",

        {

            days

        }

    );

    return response.data;

};

export const cancelBreak = async () => {

    const response = await api.post(

        "/recovery/cancel-break"

    );

    return response.data;

};

export const getProtectionStatus = async () => {

    const response = await api.get(

        "/recovery/status"

    );

    return response.data;

};