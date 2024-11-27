import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getOrdersByEmail } from "../../../../firebase/api";
import { Invoice } from "../../../../types/types";
import ContentBottom from "../../admin/components/tabSells/components/ContentBottom";
import useUserStore from "../../../../state/userStore";

export default function TabsBuys() {

    const [invoices, setInvoices] = useState<Invoice[]>([])
    const { usuario } = useUserStore()
    useEffect(() => {
        getOrdersByEmail(usuario!.email).then((lista) => setInvoices(lista));
    }, [])
    return (
        <Tabs color="warning">
            <Tab title="Lista">
                <div className="bg-slate-500 w-3/4 h-[80vh]">
                    <Table
                        color="warning"
                        selectionMode="single"
                        isHeaderSticky
                        classNames={{ wrapper: ["min-h-[80vh]"] }}

                    >
                        <TableHeader>
                            <TableColumn>Propietario</TableColumn>
                            <TableColumn>Direccion</TableColumn>
                            <TableColumn>Telefono</TableColumn>
                            <TableColumn>Fecha</TableColumn>
                            <TableColumn>Valor pagado</TableColumn>
                            <TableColumn>Productos</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="No hay productos registrados">
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>
                                        <span>{invoice.correo}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{invoice.direccion}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{invoice.telefono}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{invoice.fecha.toLocaleDateString() + " " + invoice.fecha.toLocaleTimeString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{invoice.total}</span>
                                    </TableCell>
                                    <TableCell>
                                        {invoice.productos.length > 0 && (
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button variant="bordered">
                                                        Productos
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu aria-label="Dynamic Actions" items={invoice.productos}>
                                                    {(p) => (
                                                        <DropdownItem key={p.id}>{p.name + " " + p.quantity}</DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Tab>
        </Tabs>
    )

}