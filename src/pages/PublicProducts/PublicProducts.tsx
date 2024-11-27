import Menu from "../components/header/Menu";
import Sidebar from "./components/sidebar/Sidebar";
import CardProduct from "./components/cardProduct/CardProduct";
import { useEffect } from "react";
import { getICategories, getProduct } from "../../firebase/api";
import useProductStore from "../../state/producStore";
import useCategoryStore from "../../state/categoryStore";

export default function PublicProducts() {
    const { listProducts, setProducts } = useProductStore();
    const { setCategories } = useCategoryStore()
    useEffect(() => {
        getProduct()
            .then((products) => setProducts(products))
            .catch((error) => {
                console.log(error);
            });
        getICategories().then((categories) => setCategories(categories))
    }, [setProducts]);


    return (
        <>
            <Menu />
            <div className='h-[90vh] bg-hero bg-cover bg-fixed'>
                <div className='p-4 flex gap-3'>
                    <Sidebar />

                    <section className="flex flex-wrap items-start gap-6">

                        {
                            listProducts.map((product) => (
                                <CardProduct
                                    key={product.id}  // Siempre agrega una clave única cuando renderizas una lista de componentes
                                    category={product.category}
                                    quantity={1}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    img={product.img}
                                    price={product.price}
                                />
                            ))
                        }
                    </section>
                </div>
            </div>
        </>
    );
}