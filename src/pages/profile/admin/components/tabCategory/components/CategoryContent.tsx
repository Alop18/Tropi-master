import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getICategories, getProduct, setCategory, setProduct } from "../../../../../../firebase/api";
import useAdminStore from "../../../../../../state/adminStore";
import useCategoryStore from "../../../../../../state/categoryStore";

export default function CategoryContent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { register, handleSubmit } = useForm()
    const { setCategories } = useCategoryStore()
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);

        try {
            await setCategory({
                id: "",
                nombre: data.name
            })

            await getICategories().then((lista) => setCategories(lista)).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);

        }
    })

    const handletClick = (onClick: Function) => {
        onSubmit()
        onClick()
    }
    return (
        <div className="flex justify-end">
            <Button onClick={onOpen} className="font-bold text-white" color="success">Agregar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (<>
                        <ModalHeader>
                            <h1>Agregar categoria</h1>
                        </ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-2" >
                                <Input isRequired type="text" label="Nombre" {...register("name", { required: true })}></Input>

                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} color="danger">Cancelar</Button>
                            <Button onClick={() => handletClick(onClose)} color="success">Guardar</Button>
                        </ModalFooter>
                    </>)}
                </ModalContent>
            </Modal>
        </div>
    )
}