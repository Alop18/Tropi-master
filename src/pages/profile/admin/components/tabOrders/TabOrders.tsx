import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Image, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import ModalEdit from "../tabProducts/components/ModalEdit";
import ContentBottom from "../tabSells/components/ContentBottom";
import { useEffect, useState } from "react";
import { Invoice } from "../../../../../types/types";
import { getInvoices } from "../../../../../firebase/api";
import React from "react";

export default function TabOrders() {
    const [invoices, setInvoices] = useState<Invoice[]>([])

    useEffect(() => {
        getInvoices().then((lista) => setInvoices(lista));
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
                        bottomContent={<ContentBottom />}
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