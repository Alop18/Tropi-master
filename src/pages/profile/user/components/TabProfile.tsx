import { Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { MdEditDocument } from "react-icons/md";
import useUserStore from "../../../../state/userStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUserByEmail, updateUser } from "../../../../firebase/api";

export default function TabProfile() {
    const { usuario, setUsuario } = useUserStore()
    const { register, handleSubmit, setValue } = useForm()
    const { onOpen, onOpenChange, isOpen } = useDisclosure()
    useEffect(() => {
        setValue("nombres", usuario?.name)
        setValue("apellidos", usuario?.lastname)
        setValue("address", usuario?.addres)
        setValue("telefono", usuario?.telefono)

    }, [])
    const onSubmit = handleSubmit(async (data) => {
        updateUser({ addres: data.address, email: usuario!.email, rol: "", telefono: data.telefono, lastname: data.apellidos, name: data.nombres }).then((value) => {
            if (value) {
                getUserByEmail(usuario!.email).then((usuario) => {
                    setUsuario({ addres: usuario!.addres, email: usuario!.email, rol: usuario!.rol, telefono: usuario!.telefono, lastname: usuario!.lastname, name: usuario!.name })
                })
            }
        })
    })
    const handletClick = (onClose: Function) => {
        onSubmit()
        onClose()
    }
    return (
        <Card className="flex items-center h-[87vh] " >
            <Card className="w-[90%]">
                <CardHeader className="font-bold">
                    Informacion basica
                </CardHeader>
                <CardBody className="grid grid-cols-3 grid-rows-2 gap-6">
                    <div className="flex flex-col"> <span className="font-semibold">Correo</span><span>{usuario?.email}</span></div>
                    <div className="flex flex-col"> <span className={`font-semibold ${!usuario?.name ? 'text-red-500' : ''}`}>Nombres</span><span>{usuario?.name}</span></div>
                    <div className="flex flex-col"> <span className={`font-semibold ${!usuario?.lastname ? 'text-red-500' : ''}`}>Apellidos</span><span>{usuario?.lastname}</span></div>
                    <div className="flex flex-col"> <span className="font-semibold">Direccion</span><span>{usuario?.addres}</span></div>
                    <div className="flex flex-col"> <span className="font-semibold">Telefono</span><span>{usuario?.telefono}</span></div>

                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button isIconOnly color="warning" onClick={onOpen}><MdEditDocument /></Button>
                    <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader>
                                        <span className="font-bold">Editar perfil</span>
                                    </ModalHeader>
                                    <ModalBody>
                                        <form>
                                            <Input size='sm' className='m-3 w-[330px]' isRequired label='Nombres' type='text' {...register('nombres', { required: true })} />
                                            <Input size='sm' className='m-3 w-[330px]' isRequired label='Apellidos' type='text' {...register('apellidos', { required: true })} />
                                            <Input size='sm' className='m-3 w-[330px]' isRequired label='Direccion' type='address' {...register('address', { required: true })} />
                                            <Input size='sm' className='m-3 w-[330px]' isRequired label='Celular' type='' {...register('telefono', { required: true })} />
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={onClose} color="danger">Cancelar</Button>
                                        <Button onClick={() => handletClick(onClose)} color="success">Guardar</Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardFooter>
            </Card>

        </Card>
    )
}