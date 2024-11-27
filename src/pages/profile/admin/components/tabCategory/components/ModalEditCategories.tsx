import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import useCategoryStore from "../../../../../../state/categoryStore"
import { useForm } from "react-hook-form"
import { getICategories, updateCategory } from "../../../../../../firebase/api"
import { Category } from "../../../../../../types/types"
import { MdEditDocument } from "react-icons/md"

export default function ModalEditCategory(category: Category) {
    const { setCategories } = useCategoryStore()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const { register, setValue, handleSubmit } = useForm()
    const handletClick = (onClose: Function) => {
        onSubmit()
        onClose()
    }

    const onSubmit = handleSubmit((data) => {
        updateCategory({ id: category.id, nombre: data.name })
        getICategories().then((lista) => setCategories(lista)).catch((error) => {
            console.log(error);
        })
    })

    setValue("name", category.nombre);

    return (
        <>
            <Button onClick={onOpen} color="warning" isIconOnly><MdEditDocument /></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <><ModalHeader>
                            <h1>Modificar categoria</h1>
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
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}