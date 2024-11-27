import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getUserByEmail } from "../firebase/api";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    requiredRole: string;
}
export default function ProtectedRouter({ requiredRole }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const usuario = await getUserByEmail(user.email!);
                setUserRole(usuario?.rol || null);
            } else {
                setUserRole(null);
            }
            setIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Puedes renderizar un spinner de carga aquí
    }

    if (!userRole) {
        return <Navigate to="/login" />;
    }

    if (userRole !== requiredRole) {
        return <Navigate to="/unauthorized" replace />; // O una ruta de error
    }

    return <Outlet />;

}