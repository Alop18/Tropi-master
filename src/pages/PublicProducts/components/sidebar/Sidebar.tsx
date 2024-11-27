import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import useProductStore from "../../../../state/producStore";
import useCategoryStore from "../../../../state/categoryStore";

export default function Sidebar() {
    const { filterProducts, restoreProducts } = useProductStore()
    const { categories } = useCategoryStore()
    return (
        <Card className="w-80">
            <CardHeader className=" flex-col justify-center ">
                <div>
                    <FaShoppingCart />
                </div>
                <p>Categorias</p>
            </CardHeader>
            <CardBody className="flex-col gap-2">
                <Button onClick={restoreProducts}>Todos</Button>
                {categories.map((category) => (
                    <Button onClick={() => filterProducts(category.nombre)}>{category.nombre}</Button>
                ))
                }

            </CardBody>
        </Card>


    )
}