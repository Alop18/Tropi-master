import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { MdEditDocument } from "react-icons/md";
import { Product } from "../../../../../../types/types";
import { getProduct, updateProduct } from "../../../../../../firebase/api";
import useAdminStore from "../../../../../../state/adminStore";

export default function ModalEdit(product: Product) {
    const { setProducts } = useAdminStore()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const { register, setValue, handleSubmit } = useForm()
    const handletClick = (onClose: Function) => {
        onSubmit()
        onClose()
    }

    const onSubmit = handleSubmit((data) => {
        updateProduct({ id: product.id, description: data.description, img: data.img, name: data.name, price: data.price, quantity: 1, category: data.category })
        getProduct().then((lista) => setProducts(lista)).catch((error) => {
            console.log(error);
        })
    })

    setValue("name", product.name);
    setValue("price", product.price);
    setValue("img", product.img);
    setValue("description", product.description);
    setValue("category", product.category);
    return (
        <>
            <Button onClick={onOpen} color="warning" isIconOnly><MdEditDocument /></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <><ModalHeader>
                            <h1>Agregar producto</h1>
                        </ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-2" >
                                    <Input isRequired type="text" label="Nombre" {...register("name", { required: true })}></Input>
                                    <Input isRequired type="number" label="Precio" {...register("price", { required: true })}></Input>
                                    <Input isRequired type="text" label="Url imagen" {...register("img", { required: true })}></Input>
                                    <Input isRequired type="text" label="Categoria" {...register("category", { required: true })}></Input>
                                    <Textarea isRequired label="Descripcion" {...register("description", { required: true })}></Textarea>
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