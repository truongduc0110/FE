import { get, patch, post } from "../utils/request";

export const Register = async (option) => {
    const result = await post("authClient/register.php", option);
    return result;
}

export const Login = async (option) => {
    const result = await post("login.php", option);
    return result;
}

export const DetailUser = async (option) => {
    const result = await post("authClient/detail.php", option);
    return result;
}

export const ForgotPassword = async (option) => {
    const result = await post("authClient/forgotPassword.php", option);
    return result;
}
export const OtpPassword = async (option) => {
    const result = await post("authClient/otpPassword.php", option);
    return result;
}
export const ResetPassword = async (option) => {
    const result = await post("authClient/resetPassword.php", option);
    return result;
}


