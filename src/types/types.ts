export type Product = {
    id: string,
    name: string;
    price: number;
    description: string;
    img: string;
    quantity: number
    category: string
}


export type Car = {
    listProduct: Product[],
    total: number,
}

export type Usuario = {
    email: string,
    telefono: string,
    rol: string,
    name?: string,
    lastname?: string,
    addres: string
}

export interface PayCard {
    nombres: string;
    apellidos: string;
    numero: string;
    mes: string;
    año: string;
    cvv: string;
    saldo: number;
}

export interface Invoice {
    id: string,
    fecha: Date,
    productos: Product[]
    metodo: string,
    total: number
    correo: string
    direccion: string
    estado: string
    telefono: string
}

export interface Category {
    id: string,
    nombre: string
}