import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Select, SelectItem } from "@nextui-org/react";
import useCategoryStore from "../../../../../../state/categoryStore";

export default function DropdownCategory() {
    const { categories, setCategory } = useCategoryStore()
    return (
        <Select
            label="Categoria"
            className="max-w-xs"
        >
            {categories.map((category) => (
                <SelectItem key={category.nombre}>
                    {category.nombre}
                </SelectItem>
            ))}
        </Select>
    );
}