import { TableRow, TableCell, Image, Button } from "@nextui-org/react";
import { Product } from "../../../../../../types/types";
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

export default function ProductRow(product: Product) {
    return (
        <TableRow>
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
                <span>categoria</span>
            </TableCell>
            <TableCell>
                <span>{product.description}</span>
            </TableCell>
            <TableCell>
                <Button isIconOnly><MdEditDocument /></Button>
            </TableCell>
            <TableCell>
                <Button isIconOnly> <FaTrash /></Button>
            </TableCell>
        </TableRow>
    )
}