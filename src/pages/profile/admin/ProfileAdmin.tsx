import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import MenuAdmin from "./components/navAdmin/MenuAdmin";
import { useState } from "react";
import { toolSectionOPtions } from "../../../enum/enums";
import TabOrders from "./components/tabOrders/TabOrders";
import TabProducts from "./components/tabProducts/TabProducts";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlineFastfood } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import TabCategory from "./components/tabCategory/TabCategory";
export default function ProfileAdmin() {
    const [toolSection, setToolsection] = useState(toolSectionOPtions.PRODUCTOS)
    return (
        <div className="bg-hero bg-cover bg-fixed">
            <MenuAdmin></MenuAdmin>
            <div className="flex gap-3 mt-2">
                <aside className="w-1/4 h-[91vh]">
                    <Card className="h-[87vh]">
                        <CardHeader className="flex justify-center font-bold">
                            <span className="flex flex-row gap-3 items-center">Herramientas <FaTools /></span>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-3">


                            <Button onClick={() => setToolsection(toolSectionOPtions.PEDIDOS)} className="font-bold" variant="light">Pedidos<LiaFileInvoiceSolid size={20} /></Button>
                            <Button onClick={() => setToolsection(toolSectionOPtions.PRODUCTOS)} className="font-bold" variant="light">Productos<MdOutlineFastfood size={20} /></Button>
                            <Button onClick={() => setToolsection(toolSectionOPtions.CATEGORIA)} className="font-bold" variant="light">Categorias<BiCategory size={20} /></Button>
                        </CardBody>
                    </Card>
                </aside>
                <section className="w-3/4 ">

                    {toolSection === toolSectionOPtions.PEDIDOS && <TabOrders></TabOrders>}
                    {toolSection === toolSectionOPtions.PRODUCTOS && <TabProducts></TabProducts>}
                    {toolSection === toolSectionOPtions.CATEGORIA && <TabCategory></TabCategory>}
                </section>
            </div>
        </div>
    )
}