import Footer from "../components/footer/footer";
import Menu from "../components/header/Menu";

export default function Acerca() {
    return (<div>
        <Menu />
        <section className="bg-hero bg-fixed bg-cover bg-center h-screen flex flex-col justify-center items-center text-white">
            <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Acerca de Nosotros</h1>
                <p className="text-lg md:text-xl mb-8">
                    En Tropiland, nos apasiona proporcionar deliciosas opciones de comida para satisfacer los gustos de nuestros clientes. Desde malteadas refrescantes hasta hamburguesas jugosas, nuestra misión es ofrecer una experiencia gastronómica excepcional para todos.
                </p>
                <p className="text-lg md:text-xl mb-8">
                    Fundada en [año de fundación], Tropiland se ha convertido en un destino popular para aquellos que buscan disfrutar de una comida rápida y sabrosa en la ciudad de Valleduapar. Nuestra dedicación a la calidad, la frescura y el servicio al cliente nos distingue como líderes en la industria alimentaria local.
                </p>
                <p className="text-lg md:text-xl mb-8">
                    En Tropiland, creemos en la importancia de la comunidad y nos esforzamos por contribuir al bienestar de nuestra ciudad. Nos enorgullece apoyar a organizaciones benéficas locales y eventos comunitarios en todo Valleduapar.
                </p>
                <p className="text-lg md:text-xl mb-8">
                    Gracias por elegir Tropiland. Esperamos tener la oportunidad de servirte pronto y que disfrutes de la deliciosa comida que tenemos para ofrecer.
                </p>
            </div>
        </section>
        <Footer />
    </div>
    );
}
