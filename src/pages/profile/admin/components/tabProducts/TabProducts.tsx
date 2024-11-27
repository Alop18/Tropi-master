import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, Button, TableCell, TableRow, Image } from "@nextui-org/react";
import ContentBottom from "../tabSells/components/ContentBottom";
import { useEffect } from "react";
import { deleteProduct, getICategories, getProduct } from "../../../../../firebase/api";
import { FaTrash } from "react-icons/fa";
import useAdminStore from "../../../../../state/adminStore";
import ModalEdit from "./components/ModalEdit";
import useCategoryStore from "../../../../../state/categoryStore";

export default function TabProducts() {
    const { setProducts, listProduct } = useAdminStore()
    const { setCategories } = useCategoryStore()
    useEffect(() => {
        getProduct().then((lista) => setProducts(lista)).catch((error) => {
            console.log(error);
        })

        getICategories().then((lista) => setCategories(lista)).catch((error) => {
            console.log(error);
        })
    }, [])
    const ondelete = async (id: string) => {
        await deleteProduct(id);
        getProduct().then((lista) => setProducts(lista)).catch((error) => {
            console.log(error);
        })
    }
    return (
        <Tabs color="warning">
            <Tab title="Lista" >
                <div className="bg-slate-500 w-3/4 h-[80vh]">
                    <Table color="warning" selectionMode="single" isHeaderSticky classNames={{ wrapper: ["min-h-[80vh]"] }} bottomContent={<ContentBottom />}>
                        <TableHeader >
                            <TableColumn>Imagen</TableColumn>
                            <TableColumn>Nombre</TableColumn>
                            <TableColumn>Precio</TableColumn>
                            <TableColumn>Categoria</TableColumn>
                            <TableColumn>descripcion</TableColumn>
                            <TableColumn>Editar</TableColumn>
                            <TableColumn>Eliminar</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No hay productos registrados"}>
                            {listProduct.map((product) => (<TableRow>
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
                                    <span>{product.category}</span>
                                </TableCell>
                                <TableCell>
                                    <span>{product.description}</span>
                                </TableCell>
                                <TableCell>
                                    <ModalEdit {...product}></ModalEdit>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => ondelete(product.id)} color="danger" isIconOnly> <FaTrash /></Button>
                                </TableCell>
                            </TableRow>)

                            )}
                        </TableBody>

                    </Table>
                </div>
            </Tab>

        </Tabs>

    )
}