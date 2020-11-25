import axios from "axios";
export const authService = {
    getOtp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/phone`, data),
    verifyOtp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/phone/verify`, data),
    submitEmail: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/email`, data),
    verifyEmail: (data) => axios.post(`https://hiring.getbasis.co/candidate/users/email/verify`, data),
    signUp: (data) => axios.post(`https://hiring.getbasis.co/candidate/users`, data),
    checkReferralCode: (code) => axios.put(`https://hiring.getbasis.co/candidate/users/referral/${code}`),
};
