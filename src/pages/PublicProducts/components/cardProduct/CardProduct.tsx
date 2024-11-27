import { Button, Card, CardHeader, CardBody, CardFooter, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from "@nextui-org/react";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import useCarStore from "../../../../state/store";
import { Product } from "../../../../types/types";
import { useNavigate } from "react-router-dom";





export default function CardProduct(product: Product) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cantidad, setCantidad] = useState(1)
    const [precio, setprecio] = useState(product.price)
    const { listProduct, setProducts } = useCarStore()
    const navigate = useNavigate()
    const incrementProduct = () => {
        if (cantidad <= 8) {
            const nuevaCantidad = cantidad + 1;
            setCantidad(nuevaCantidad);
            const nuevoPrecio = product.price * nuevaCantidad;
            setprecio(nuevoPrecio);
        };

    }

    const decrementProduct = () => {
        if (cantidad >= 2) {
            const nuevaCantidad = cantidad - 1;
            setCantidad(nuevaCantidad);
            const nuevoPrecio = product.price * nuevaCantidad;
            setprecio(nuevoPrecio);
        };
    }


    const handleAddToCartAndClose = (onClose: () => void) => {
        setProducts([...listProduct, {
            id: product.id,
            name: product.name,
            description: product.description,
            img: product.img,
            price: product.price,
            quantity: cantidad,
            category: product.category
        }])
        onClose();
    };
    return (
        <>
            <Button onPress={onOpen} className="h-[280px] w-[280px] p-0 flex justify-center items-center">
                <Card className="h-[280px] w-[280px] flex flex-col justify-between items-center p-4">
                    <CardHeader className="flex justify-center items-center">
                        <h1 className="text-center font-bold">{product.name}</h1>
                    </CardHeader>
                    <CardBody className="flex justify-center items-center overflow-hidden">
                        <Image className="w-[150px] h-[150px] " src={product.img} alt={product.name} />
                    </CardBody>
                    <CardFooter className="flex flex-col justify-center items-center">
                        <span className="flex justify-center items-center"><FaDollarSign /> {product.price}</span>
                    </CardFooter>
                </Card>
            </Button>
            <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable  >
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader>
                                    <p>{product.name}</p>
                                </ModalHeader>
                                <ModalBody className="flex-row w-[500px]">
                                    <div>
                                        <Image src={product.img} />
                                    </div>
                                    <div className="w-80">
                                        <div className="w-32">
                                            <span className="font-bold">Descripcion</span>
                                            <p className="w-full">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="flex-col">
                                            <span className="font-bold">Precio</span>
                                            <span className="flex justify-stretch items-center"><FaDollarSign /> {precio}</span>
                                        </div>
                                        <div className="flex gap-1 justify-center items-center">
                                            <div className="flex gap-1">
                                                <span>Cantidad </span>
                                                <span className="font-bold">{cantidad}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button onClick={decrementProduct} isIconOnly><HiArrowSmDown /></Button>
                                                <Button onClick={incrementProduct} isIconOnly>< HiArrowSmUp /></Button>

                                            </div>
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter className="flex justify-center">
                                    <Button className="font-bold text-white" color="success" onClick={() => handleAddToCartAndClose(onClose)}>Agregar al carrito</Button>
                                    <Button className="font-bold text-white" color="success" onClick={() => {
                                        setProducts([...listProduct, product])
                                        navigate("/pagar")
                                    }} >Comprar</Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}