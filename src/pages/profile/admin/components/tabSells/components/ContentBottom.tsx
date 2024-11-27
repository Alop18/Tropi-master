import { Button, Dropdown, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getProduct, setProduct } from "../../../../../../firebase/api";
import useAdminStore from "../../../../../../state/adminStore";
import DropdownCategory from "../../tabProducts/components/DropDownCategory";
import useCategoryStore from "../../../../../../state/categoryStore";

export default function ContentBottom() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { register, handleSubmit } = useForm()
    const { setProducts } = useAdminStore()
    const { category } = useCategoryStore()
    const onSubmit = handleSubmit(async (data) => {


        try {
            await setProduct({
                category: category!.nombre,
                id: "",
                description: data.description,
                img: data.img,
                name: data.name,
                price: data.price,
                quantity: 1
            })

            await getProduct().then((lista) => setProducts(lista)).catch((error) => {
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
                            <h1>Agregar producto</h1>
                        </ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-2" >
                                <Input isRequired type="text" label="Nombre" {...register("name", { required: true })}></Input>
                                <Input isRequired type="number" label="Precio" {...register("price", { required: true })}></Input>
                                <Input isRequired type="text" label="Url imagen" {...register("img", { required: true })}></Input>
                                <Textarea isRequired label="Descripcion" {...register("description", { required: true })}></Textarea>
                                <DropdownCategory ></DropdownCategory>
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