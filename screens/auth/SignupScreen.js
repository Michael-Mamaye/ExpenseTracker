import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { createUser } from "../../util/auth";

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    async function signupHandler({ email, password }) {
        setIsAuthenticating(true)
        try {
            await createUser({ email, password })
        }
        catch (error) {
            Alert.alert('Authentication Failed', "Can't Create Your account, please check your network")
        }
        setIsAuthenticating(false)
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating User..." />
    }


    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;