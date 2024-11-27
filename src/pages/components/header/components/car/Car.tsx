import { Badge, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, Image } from "@nextui-org/react";
import { FaPizzaSlice, FaShoppingCart, FaTrash } from "react-icons/fa";
import useCarStore from "../../../../../state/store";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export default function Car() {
    const { listProduct, setProducts } = useCarStore()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const location = useLocation()
    const navigate = useNavigate()
    const delectProduc = (id: string) => {
        setProducts(listProduct.filter(product => product.id != id))
    }

    const incrementProduct = (id: number) => {
        if (listProduct[id].quantity <= 8) {
            listProduct[id].quantity++;
            setProducts(listProduct)
        }

    }

    const decrementProduct = (id: number) => {
        if (listProduct[id].quantity >= 2) {
            listProduct[id].quantity--;
            setProducts(listProduct)
        }
    }

    return (
        <>
            <Button isDisabled={location.pathname !== "/pagar" ? false : true} variant="light" isIconOnly onClick={onOpen}>
                <Badge size="sm" color="danger" content={listProduct ? listProduct.length : 0} isInvisible={listProduct.length > 0 ? false : true} shape="circle">

                    <FaShoppingCart size={20} />
                </Badge>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" isDismissable>

                <ModalContent className=" overflow-scroll">
                    {
                        (onClose) => (
                            <>
                                <ModalHeader>
                                    <span>Resumen de la compra</span>
                                </ModalHeader>
                                <ModalBody>
                                    {listProduct.length > 0 ? <Table isCompact>
                                        <TableHeader>
                                            <TableColumn>Producto</TableColumn>
                                            <TableColumn>Cantidad</TableColumn>
                                            <TableColumn>Sub Total</TableColumn>
                                            <TableColumn>Eliminar</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                listProduct.map((product, value) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell > <Image width={100} height={100} src={product.img}></Image></TableCell>
                                                        <TableCell > <span >{product.quantity}</span> <Button onClick={() => decrementProduct(value)} className="mx-1" isIconOnly>< HiArrowSmDown /></Button><Button isIconOnly onClick={() => incrementProduct(value)}>< HiArrowSmUp /></Button> </TableCell>
                                                        <TableCell>{product.price * product.quantity}</TableCell>
                                                        <TableCell><Button onClick={() => delectProduc(product.id)} color="danger" isIconOnly><FaTrash /></Button></TableCell>
                                                    </TableRow>
                                                ))
                                            }


                                        </TableBody>
                                    </Table> : <div className="flex flex-col justify-center items-center w-full h-200 gap-4">
                                        <span>Agrega productos para tu compra</span>
                                        <div className="flex justify-end">
                                            <IoFastFood size={50} className="mx-1" />
                                            <FaPizzaSlice size={50} className="mx-1" />
                                        </div>
                                    </div>}
                                </ModalBody>
                                {listProduct.length > 0 && <ModalFooter className="flex justify-around">
                                    <Button variant="solid" className="font-bold text-white" color="danger" onClick={onClose}>Cancelar</Button>
                                    <Button className="font-bold text-white" color="success" onClick={() => {
                                        navigate("/pagar")
                                    }}>Comprar</Button>
                                </ModalFooter>}
                            </>

                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}