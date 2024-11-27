import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Menu from "../components/header/Menu";
import useCarStore from "../../state/store";
import { useEffect } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { chargeCard, setInvoice, verifiedCard } from "../../firebase/api";
import useUserStore from "../../state/userStore";

export default function PayMent() {
    const { listProduct, total, setProducts, setTotal } = useCarStore()
    const { register, handleSubmit } = useForm()
    const { usuario } = useUserStore()
    let total1: number = 0;
    const navigate = useNavigate()

    useEffect(() => {
        listProduct.length === 0 && navigate("/productos")
        listProduct.forEach((product) => {
            total1 = total1 + product.price * product.quantity
        })

        setTotal(total1)
    }, [listProduct, total])

    const onsubmit = handleSubmit(async (data) => {
        const verified = await verifiedCard(
            {
                apellidos: data.apellidos,
                año: data.año,
                cvv: data.cvv,
                mes: data.mes,
                nombres: data.nombre,
                numero: data.ntarjeta,
                saldo: 0
            });

        if (verified) {
            await chargeCard({
                apellidos: data.apellidos,
                año: data.año,
                cvv: data.cvv,
                mes: data.mes,
                nombres: data.nombre,
                numero: data.ntarjeta,
                saldo: 0
            }, total).then((value) => {
                if (value) {
                    const currentDate: Date = new Date();
                    navigate("/productos")
                    setInvoice(
                        {
                            correo: usuario!.email,
                            direccion: usuario!.addres,
                            estado: "pagado",
                            fecha: currentDate,
                            id: "",
                            metodo: "card",
                            productos: listProduct,
                            total: total,
                            telefono: usuario!.telefono
                        }
                    )

                    setProducts([])
                }
            })
        }

    })

    return (
        <div className="bg-hero h-[100vh] bg-cover bg-fixed">
            <Menu></Menu>
            <div className="flex justify-center items-center gap-4 ">
                <Card className="h-[85vh] w-3/5 mt-3 ml-3">
                    <CardHeader className="font-bold" title="pagar">
                        Productos a comprar
                    </CardHeader>
                    <CardBody>
                        <div>
                            <Table color="warning" selectionMode="single" isHeaderSticky classNames={{ wrapper: ["min-h-[80vh]"] }} >
                                <TableHeader >
                                    <TableColumn>Imagen</TableColumn>
                                    <TableColumn>Nombre</TableColumn>
                                    <TableColumn>Precio unitario</TableColumn>
                                    <TableColumn>Cantidad</TableColumn>
                                    <TableColumn>Sub Total</TableColumn>

                                </TableHeader>
                                <TableBody emptyContent={"No hay productos registrados"}>
                                    {listProduct.map((product) => (<TableRow key={product.id}>
                                        <TableCell>
                                            <Image src={product.img} width={50} height={50} />
                                        </TableCell>
                                        <TableCell>
                                            <span>{product.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{product.price}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{product.quantity}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{product.price * product.quantity}</span>
                                        </TableCell>

                                    </TableRow>)

                                    )}
                                </TableBody>

                            </Table>
                        </div>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
                <section className="h-[85vh] w-2/5 mt-3 mr-3">
                    <Card >
                        <CardHeader>
                            <span className="font-bold">Total a pagar</span>
                        </CardHeader>
                        <CardBody>
                            <span>Impuestos: 0</span>
                            <span>Total: {total}</span>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    <Card >
                        <CardHeader>
                            <span className="font-bold">Metodo de pago</span>
                        </CardHeader>
                        <CardBody>
                            <form >
                                <div className="flex justify-start gap-2 ">
                                    <Input label="Numero de tarjeta" isRequired {...register("ntarjeta", { minLength: 16, maxLength: 16, required: true })} />
                                    <div className="flex justify-center items-center gap-2">
                                        <FaCcMastercard size={25} />
                                        <FaCcVisa size={25} />
                                    </div>
                                </div>
                                <div className="flex justify-start gap-2 my-2 ">
                                    <Input label="Mes" isRequired {...register("mes", { minLength: 2, maxLength: 2, required: true })} />
                                    <Input label="Año" isRequired {...register("año", { minLength: 4, maxLength: 4, required: true })} />
                                    <Input label="Codigo de seguridad" isRequired {...register("cvv", { minLength: 3, maxLength: 4, required: true })} />
                                </div>
                                <div className="flex justify-start gap-2 ">
                                    <Input label="Nombre(s)" isRequired {...register("nombre", { required: true })} />
                                    <Input label="Apellidos" isRequired {...register("apellidos", { required: true })} />
                                </div>

                            </form>
                        </CardBody>
                        <CardFooter className="flex justify-evenly">
                            <Button variant="solid" className="font-bold text-white" color="danger" onClick={() => navigate("/productos")} >Cancelar</Button>
                            <Button className="font-bold text-white" color="success" onClick={onsubmit}>Pagar</Button>
                        </CardFooter>
                    </Card>
                </section>

            </div>
        </div>
    )
}