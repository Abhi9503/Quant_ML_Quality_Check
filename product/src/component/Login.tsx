import { useFrappeAuth } from "frappe-react-sdk";

export const MyAuthComponent = () => {
    // Destructuring values from the useFrappeAuth hook
    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,
    } = useFrappeAuth();

    // Render loading message if authentication is in progress
    if (isLoading) return <div>loading...</div>;

    return (
        <div>
            {currentUser}
            <button onClick={() => login({ username: 'administrator', password: 'qwert@123' })}>Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={updateCurrentUser}>Fetch current user</button>
        </div>
    );
};