import { Card, Input, Button } from "@nextui-org/react";
import Menu from "../../components/header/Menu";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { handleSubmit, register } = useForm()
    const navigate = useNavigate()
    const onsubmit = handleSubmit(async (data) => {


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            if (!userCredential.user) throw new Error("No se pudo iniciar sesion")
            await setDoc(doc(db, "user", userCredential.user.uid), {
                Email: data.email,
                Address: data.address,
                phone: data.telefono,
                rol: "user"
            }).then(() => navigate("/login"))
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
                        <Input size='sm' className='m-3 w-[330px]' isRequired label='Confirmar password' type='password' {...register('ConfirPassword', { required: true, minLength: 8 })} />
                        <Input size='sm' className='m-3 w-[330px]' isRequired label='Direccion' type='address' {...register('address', { required: true })} />
                        <Input size='sm' className='m-3 w-[330px]' isRequired label='Celular' type='' {...register('telefono', { required: true })} />
                        <Button color="primary" type="submit" variant="solid" className='m-3 w-full'>
                            Registrarse
                        </Button>

                    </form>
                </Card>
            </div>
            <Footer></Footer>
        </>
    )
}