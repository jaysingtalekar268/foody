import { useMutation } from "react-query";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type CreateUserRequest = {
    auth0Id: String,
    email: String,
};

export const useCreateMyUser = () => {
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${SERVER_URL}/api/my/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to crete user");
        }

        const { mutateAsync: createUser,
            isLoading,
            isError,
            isSuccess } = useMutation(createMyUserRequest);

        return {
            createUser,
            isLoading,
            isError,
            isSuccess
        };
    };


}