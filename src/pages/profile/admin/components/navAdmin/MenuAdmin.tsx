import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Logo from "../../../../components/header/components/Logo";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function MenuAdmin() {
    const navigate = useNavigate()
    const logout = () => {
        signOut(auth).finally(() => navigate("/login"));
    }
    return (
        <Navbar className="bg-orange-500">
            < NavbarBrand >

                <Logo></Logo>
            </NavbarBrand >
            <NavbarContent justify="end" >
                <NavbarItem >
                    <Button variant="flat" className="flex justify-center items-center" onClick={logout} isIconOnly><IoLogOutOutline /></Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    )
}