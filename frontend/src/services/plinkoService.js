import api from "./api";

export const startPlinkoGame = async (

    betAmount

) => {

    const response = await api.post(

        "/plinko/start",

        {

            betAmount

        }

    );

    return response.data;

};

export const dropBall = async (

    sessionId

) => {

    const response = await api.post(

        "/plinko/drop",

        {

            sessionId

        }

    );

    return response.data;

};

export const cashOut = async (

    sessionId

) => {

    const response = await api.post(

        "/plinko/cashout",

        {

            sessionId

        }

    );

    return response.data;

};