import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/Logo";
import Car from "./components/car/Car";
import useUserStore from "../../../state/userStore";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

export default function Menu() {
    const { isLoggedIn, setIsLoggedIn } = useUserStore()
    const navigate = useNavigate()
    const logout = () => {
        signOut(auth).finally(() => {
            navigate("/login")
            setIsLoggedIn(false)
        });
    }
    return (
        <Navbar className="bg-orange-400" >
            <NavbarBrand >

                <Logo></Logo>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" to={"/"}>
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" to={"/productos"}>
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" to={"/acerca-de"}>
                        Acerca de
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Car></Car>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    {isLoggedIn ? <div><Button as={Link} to={"/perfil"} variant="flat" isIconOnly><CgProfile /></Button><Button as={Link} to={"/login"} variant="flat" isIconOnly onClick={logout}><IoLogOutOutline /></Button></div> : <Button as={Link} color="primary" to={"/login"} variant="flat">
                        Iniciar Sesion
                    </Button>}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}