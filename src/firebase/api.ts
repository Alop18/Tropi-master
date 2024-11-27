import { Category, Invoice, PayCard, Product, Usuario } from "../types/types";
import { getDocs, collection, addDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getProduct(): Promise<Product[]> {
    try {
        const collectionRef = collection(db, "products");
        const querySnapshot = await getDocs(collectionRef);

        const products: Product[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // Asumiendo que quieres incluir el ID del documento
                name: data.name,
                description: data.description,
                img: data.img,
                price: data.price,
                quantity: data.quantity,
                category: data.category
            } as Product;
        });

        return products;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }

}

export async function setProduct(product: Product) {
    try {
        const collectionRef = collection(db, "products");
        await addDoc(collectionRef, product);
    } catch (error) {
        console.log(error);

    }
}

export async function getUserByEmail(email: string): Promise<Usuario | null> {
    try {


        const usersCollection = collection(db, "user");
        const q = query(usersCollection, where("Email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const data = userDoc.data();
            return {
                addres: data.Address,
                email: data.Email,
                telefono: data.phone,
                lastname: data.lastname,
                name: data.name,
                rol: data.rol
            } as Usuario;
        } else {
            console.log("No matching documents.");
            return null;
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
        return null;
    }
}

export async function deleteProduct(id: string) {
    try {
        const collectionRef = doc(db, "products", id)
        deleteDoc(collectionRef)
    } catch (error) {
        console.log(error);

    }
}

export async function updateProduct(product: Product) {
    try {
        const collectionRef = doc(db, "products", product.id)
        updateDoc(collectionRef, {
            description: product.description,
            id: "",
            img: product.img,
            name: product.name,
            price: product.price,
            category: product.category
        })
    } catch (error) {
        console.log(error);

    }
}


export async function verifiedCard(paycard: PayCard): Promise<boolean> {
    try {
        const cardsCollection = collection(db, "paycards");
        const q = query(cardsCollection, where("numero", "==", paycard.numero));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("aquer");

            return false;
        }

        for (const doc of querySnapshot.docs) {
            const cardData = doc.data() as PayCard;
            if (
                cardData.nombres === paycard.nombres &&
                cardData.apellidos === paycard.apellidos &&
                cardData.mes === paycard.mes &&
                cardData.año === paycard.año &&
                cardData.cvv === paycard.cvv
            ) {

                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error verificando la tarjeta: ", error);
        return false;
    }
}

export async function chargeCard(paycard: PayCard, amount: number): Promise<boolean> {
    try {
        const cardsCollection = collection(db, "paycards");
        const q = query(cardsCollection, where("numero", "==", paycard.numero));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // No se encontró ninguna tarjeta con el número proporcionado
            return false;
        }

        for (const docSnap of querySnapshot.docs) {
            const cardData = docSnap.data() as PayCard;
            if (
                cardData.nombres === paycard.nombres &&
                cardData.apellidos === paycard.apellidos &&
                cardData.mes === paycard.mes &&
                cardData.año === paycard.año &&
                cardData.cvv === paycard.cvv
            ) {

                if (cardData.saldo >= amount) {

                    const newSaldo = cardData.saldo - amount;


                    const cardDocRef = doc(db, "paycards", docSnap.id);
                    await updateDoc(cardDocRef, { saldo: newSaldo });
                    return true;
                } else {

                    return false;
                }
            }
        }

        // No se encontró una tarjeta que coincida con toda la información proporcionada
        return false;
    } catch (error) {
        console.error("Error realizando el cobro a la tarjeta: ", error);
        return false;
    }
}

export async function setInvoice(invoice: Invoice) {
    try {
        const collectionRef = collection(db, "invoices");
        await addDoc(collectionRef, invoice);
    } catch (error) {
        console.error("Error al agregar la factura:", error);
    }
}

export async function getInvoices(): Promise<Invoice[]> {
    try {
        const collectionRef = collection(db, "invoices");
        const querySnapshot = await getDocs(collectionRef);

        const invoices: Invoice[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // Asumiendo que quieres incluir el ID del documento
                fecha: data.fecha.toDate(), // Convertir el campo fecha a tipo Date
                productos: data.productos,
                metodo: data.metodo,
                total: data.total,
                correo: data.correo,
                direccion: data.direccion,
                estado: data.estado,
                telefono: data.telefono
            } as Invoice;
        });

        return invoices;
    } catch (error) {
        console.error("Error al obtener las facturas: ", error);
        return [];
    }
}


export async function setCategory(category: Category) {
    try {
        const collectionRef = collection(db, "categories");
        await addDoc(collectionRef, category);
    } catch (error) {
        console.error("Error al agregar la factura:", error);
    }
}

export async function getICategories(): Promise<Category[]> {
    try {
        const collectionRef = collection(db, "categories");
        const querySnapshot = await getDocs(collectionRef);

        const categories: Category[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                nombre: data.nombre
            } as Category;
        });

        return categories;
    } catch (error) {
        console.error("Error al obtener las facturas: ", error);
        return [];
    }
}

export async function updateCategory(category: Category) {
    try {
        const collectionRef = doc(db, "categories", category.id)
        updateDoc(collectionRef, {
            id: "",
            nombre: category.nombre
        })
    } catch (error) {
        console.log(error);

    }
}

export async function deleteCategory(id: string) {
    try {
        const collectionRef = doc(db, "categories", id)
        deleteDoc(collectionRef)
    } catch (error) {
        console.log(error);

    }
}

export async function getOrdersByEmail(email: string): Promise<Invoice[]> {
    try {
        const invoicesCollection = collection(db, "invoices");
        const q = query(invoicesCollection, where("correo", "==", email));
        const querySnapshot = await getDocs(q);

        const invoices: Invoice[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            invoices.push({
                id: doc.id,
                fecha: data.fecha.toDate(),
                productos: data.productos,
                metodo: data.metodo,
                total: data.total,
                correo: data.correo,
                direccion: data.direccion,
                estado: data.estado,
                telefono: data.telefono
            } as Invoice);
        });

        return invoices;
    } catch (error) {
        console.error("Error getting invoices: ", error);
        return [];
    }
}

export async function updateUser(user: Usuario) {
    try {
        console.log(user.email);

        const usersCollection = collection(db, "user");
        const q = query(usersCollection, where("Email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userRef = doc(db, "user", userDoc.id);

            await updateDoc(userRef, {
                Address: user.addres,
                phone: user.telefono,
                lastname: user.lastname,
                name: user.name,
            });


            return true;
        } else {
            console.log("vacio");

            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}