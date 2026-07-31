import api from "./api";

export const startCrashGame = async (

    betAmount

) => {

    const response =
        await api.post(

            "/crash/start",

            {

                betAmount

            }

        );

    return response.data;

};

export const cashOut = async (

    sessionId,

    multiplier

) => {

    const response =
        await api.post(

            "/crash/cashout",

            {

                sessionId,

                multiplier

            }

        );

    return response.data;

};

export const getCrashPoint = async (

    sessionId

) => {

    const response =
        await api.get(

            `/crash/${sessionId}`

        );

    return response.data;

};

export const crashGame = async (

    sessionId

) => {

    const response =

        await api.post(

            "/crash/crash",

            {

                sessionId

            }

        );

    return response.data;

};