import { UseMutateFunction, useMutation } from "react-query";
import { useAuth0 } from '@auth0/auth0-react'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type CreateUserRequest = {
    auth0Id: String,
    email: String,
};

export const useCreateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${SERVER_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",

            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to crete user");
        }
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess, } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };


}

