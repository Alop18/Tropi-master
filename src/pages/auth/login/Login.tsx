import { useForm } from 'react-hook-form'


import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../components/header/Menu';
import { Button, Card, Input } from '@nextui-org/react';
import Footer from '../../components/footer/footer';
import { getUserByEmail } from '../../../firebase/api';
import useUserStore from '../../../state/userStore';
export default function Login() {

    const navigate = useNavigate()
    const { handleSubmit, register } = useForm()
    const { setIsLoggedIn, setUsuario } = useUserStore()
    const onsubmit = handleSubmit(async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            if (!userCredential.user) throw new Error("No se pudo iniciar sesion")
            console.log(userCredential);
            const user = await getUserByEmail(userCredential.user.email!)
            if (user?.rol === "admin") {
                navigate("/admin")
            } else {
                console.log(user);

                setIsLoggedIn(true);
                setUsuario(user!);
                navigate("/productos")
            }

        } catch (error) {
            console.log(error);

        }

    })


    return (
        <>
            <Menu></Menu>
            <div className='flex justify-center items-center bg-cover bg-no-repeat bg-hero h-screen bg-center'>
                <Card>
                    <form onSubmit={onsubmit} className='flex flex-col items-center justify-center p-6 rounded-lg'>
                        <h3 className='m-3 text-center font-bold text-orange-500'>Inicio de sesión</h3>
                        <Input size='sm' className='m-3 w-[330px]' isRequired label='Email' type='email' {...register('email', { required: true })} />
                        <Input size='sm' className='m-3 w-[330px]' isRequired label='Password' type='password' {...register('password', { required: true, minLength: 8 })} />

                        <Button color="primary" type="submit" variant="solid" className='m-3 w-full'>
                            Iniciar Sesión
                        </Button>
                        <p className='m-3 text-center'>Si aún no estás registrado, por favor {<Link className='font-bold text-red-600' to={"/register"}>regístrate</Link>}</p>
                    </form>
                </Card>
            </div>
            <Footer></Footer>
        </>

    )
}