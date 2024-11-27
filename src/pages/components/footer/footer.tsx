import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex justify-start items-center gap-5 bg-orange-500 h-20">
            <FaFacebook size={25} />
            <FaInstagramSquare size={25} />
            <FaSquareXTwitter size={25} />
            <FaYoutube size={25} />
        </footer>
    )
}