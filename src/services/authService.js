import axios from "axios";
import { rootService } from "./rootService";
import { store } from "../redux/store";
export const authService = {
    getOtp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/phone`, data),
    verifyOtp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/phone/verify`, data),
    submitEmail: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/email`, data),
    verifyEmail: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/email/verify`, data),
    signUp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users`, data),
    checkReferralCode: (code) => axios.put(`https://hiring.getbasis.co/candidate/users/referral/${code}`),
    updateProfile: (data) => {
        let userId = (store.getState().auth.user && store.getState().auth.user._id) || "";
        return rootService().basisApi.put(`/users/${userId}`, data);
    },
    logoutUser: (data) => {
        let userId = (store.getState().auth.user && store.getState().auth.user._id) || "";
        return rootService().basisApi.delete(`/users/logout/${userId}`, data);
    },
    resendOtp: (data) => axios.put(`https://hiring.getbasis.co/candidate/users/otp/resend`, data),
    resendEmailToken: (data) => axios.put(`https://hiring.getbasis.co/candidate/users/token/resendtoken`, data),
};
