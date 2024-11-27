
import Menu from "../components/header/Menu";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Footer from "../components/footer/footer";

export default function Home() {
    const especialidadesDeComida = [
        {
            nombre: "Malteadas",
            imagen: "https://www.cucinare.tv/wp-content/uploads/2020/01/Malteadas1.jpg",
            descripcion: "¡Refrescantes y deliciosas!"
        },
        {
            nombre: "Hamburguesas",
            imagen: "https://th.bing.com/th/id/OIP.xNdUjMGAMHXEcleGUJSZ5wHaE7?rs=1&pid=ImgDetMain",
            descripcion: "¡Sabrosas y jugosas!"
        },
        {
            nombre: "Salchipapas",
            imagen: "https://i.ytimg.com/vi/9YxJOHCYawQ/maxresdefault.jpg",
            descripcion: "¡Una deliciosa combinación!"
        },
        {
            nombre: "Pizzas",
            imagen: "https://s1.1zoom.me/big0/946/Fast_food_Pizza_Sausage_Olive_Black_background_598771_1280x853.jpg",
            descripcion: "¡Irresistibles y llenas de sabor!"
        }
    ];
    return (
        <div>
            <Menu />
            <section className="bg-hero bg-fixed bg-cover bg-center h-screen flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">Bienvenido a Tropiland</h1>
                <p className="text-lg md:text-xl mb-12">¡Descubre nuestras deliciosas opciones de comida!</p>
            </section>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Nuestras Especialidades</h2>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        className="mySwiper "
                    >
                        {especialidadesDeComida.map((especialidad, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex justify-center ">
                                    <img className="h-80 md:h-96 object-cover rounded-lg shadow-lg" src={especialidad.imagen} alt={especialidad.nombre} />
                                </div>
                                <div className="text-center my-6">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{especialidad.nombre}</h3>
                                    <p className="text-gray-600">{especialidad.descripcion}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <Footer />
        </div>
    );
}