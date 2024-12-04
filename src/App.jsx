import Header from "./components/Header"
import Footer from "./components/Footer"
import MenuJuegos from "./components/MenuJuegos"

export default function App() {

  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">Juegos</h1>
          </div>
        </header>
        <section className="grow container mx-auto flex justify-center items-center px-4 lg:px-16 xxl:px-0 pb-12">
          <MenuJuegos display="cards" />
        </section>
      </main>
      <Footer />
    </div>
  )
}