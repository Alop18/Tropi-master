import { Image } from "@nextui-org/react";
import image from "../../../../assets/image-removebg-preview.png";
export default function Logo() {
    return (
        <div className="bg-slate-100 p-2 rounded-full">
            <Image width={100} height={80} src={image}></Image>
        </div>
    )
}