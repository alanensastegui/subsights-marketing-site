import { useState, useEffect } from "react";

interface UseAdminAuthReturn {
    isAuthorized: boolean;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: () => void;
    handleLogout: () => void;
}

export function useAdminAuth(): UseAdminAuthReturn {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Check if already authorized on mount
        const stored = localStorage.getItem("admin_authorized");
        if (stored === "true") {
            setIsAuthorized(true);
        }
    }, []);

    const handleLogin = () => {
        const correctPassword = "subsights2025!";

        if (password === correctPassword) {
            setIsAuthorized(true);
            localStorage.setItem("admin_authorized", "true");
            setPassword("");
        } else {
            alert("Invalid password");
        }
    };

    const handleLogout = () => {
        setIsAuthorized(false);
        localStorage.removeItem("admin_authorized");
        setPassword("");
    };

    return {
        isAuthorized,
        password,
        setPassword,
        handleLogin,
        handleLogout,
    };
}
