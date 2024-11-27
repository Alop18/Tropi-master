import { Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import ContentBottom from "../tabSells/components/ContentBottom";
import { useEffect, useState } from "react";
import { Category, Invoice } from "../../../../../types/types";
import { deleteCategory, getICategories } from "../../../../../firebase/api";
import { FaTrash } from "react-icons/fa";
import useCategoryStore from "../../../../../state/categoryStore";
import CategoryContent from "./components/CategoryContent";
import ModalEditCategory from "./components/ModalEditCategories";

export default function TabCategory() {
    const { categories, setCategories } = useCategoryStore()

    useEffect(() => {
        getICategories().then((lista) => setCategories(lista));
    }, [])

    const onClickDelete = (id: string) => {
        deleteCategory(id).finally(() => {
            getICategories().then((lista) => setCategories(lista));
        })

    }
    return (
        <Tabs color="warning">
            <Tab title="Lista">
                <div className="bg-slate-500 w-3/4 h-[80vh]">
                    <Table
                        color="warning"
                        selectionMode="single"
                        isHeaderSticky
                        classNames={{ wrapper: ["min-h-[80vh]"] }}
                        bottomContent={<CategoryContent />}
                    >
                        <TableHeader>
                            <TableColumn>Categoria</TableColumn>
                            <TableColumn>Editar</TableColumn>
                            <TableColumn>Eliminar</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="No hay productos registrados">
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <span>{category.nombre}</span>
                                    </TableCell>
                                    <TableCell>
                                        <ModalEditCategory {...category} />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => onClickDelete(category.id)} color="danger" isIconOnly> <FaTrash /></Button>
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