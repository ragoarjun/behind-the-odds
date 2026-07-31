import api from "./api";

export const startSlotGame = async (

    betAmount

) => {

    const response = await api.post(

        "/slots/start",

        {

            betAmount

        }

    );

    return response.data;

};

export const spinSlots = async (

    sessionId

) => {

    const response = await api.post(

        "/slots/spin",

        {

            sessionId

        }

    );

    return response.data;

};

export const cashOutSlots = async (

    sessionId

) => {

    const response = await api.post(

        "/slots/cashout",

        {

            sessionId

        }

    );

    return response.data;

};