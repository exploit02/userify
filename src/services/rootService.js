import axios from "axios";
import ES6Promise from "es6-promise";
import { store } from "../redux/store";

ES6Promise.polyfill();

export const rootService = (props) => {
    return {
        basisApi: axios.create({
            baseURL: `https://hiring.getbasis.co/candidate`,
            headers: {
                Authorization: `Bearer ${store.getState().auth.user._id},${store.getState().auth.user.token}`,
            },
        }),
    };
};
