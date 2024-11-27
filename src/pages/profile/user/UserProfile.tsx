import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Menu from "../../components/header/Menu";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import TabProfile from "./components/TabProfile";
import TabsBuys from "./components/TabsBuys";

export default function UserProfile() {
    const [toolSection, setToolsection] = useState("perfil")



    return (
        <div className="bg-hero bg-cover bg-fixed">
            <Menu></Menu>

            <div className="flex gap-3 mt-2">
                <aside className="w-1/4 h-[91vh] ">
                    <Card className="h-[87vh]">
                        <CardHeader className="flex justify-center items-center">
                            <CgProfile size={40} />
                        </CardHeader>
                        <CardBody>
                            <Button variant="light" className="font-bold" onClick={() => setToolsection("perfil")}>Perfil</Button>
                            <Button variant="light" className="font-bold" onClick={() => setToolsection("compras")}>Compras</Button>
                        </CardBody>
                    </Card>
                </aside>
                <section className="w-3/4  ">

                    {toolSection === "perfil" && <TabProfile></TabProfile>}
                    {toolSection === "compras" && <TabsBuys></TabsBuys>}

                </section>
            </div>
        </div>
    )
}