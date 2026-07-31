import api from "./api";

export const startMysteryGame = async (

    betAmount

) => {

    const response = await api.post(

        "/mystery/start",

        {

            betAmount

        }

    );

    return response.data;

};

export const openMysteryBox = async (

    sessionId

) => {

    const response = await api.post(

        "/mystery/open",

        {

            sessionId

        }

    );

    return response.data;

};

export const cashOutMystery = async (

    sessionId

) => {

    const response = await api.post(

        "/mystery/cashout",

        {

            sessionId

        }

    );

    return response.data;

};