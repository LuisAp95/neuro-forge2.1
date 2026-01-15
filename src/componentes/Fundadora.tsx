import images from "../assets/fundadora.jpeg";
import { SparklesCore } from "./sparkles";

export default function Fundadora() {
  return (
    <>
      <div className="flex flex-row  w-full h-full bg-transparent relative text-white ">
        <div className=" h-full w-full absolute inset-0 z-[-1]">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.8}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="flex w-[50%] items-centers  justify-center  ">
          <div className="flex w-[70%] h-[70%] object-fill m-auto mr-13 overflow-hidden ">
            <img
              className="w-full h-full object-cover mask-r-from-80% mask-b-from-80% mask-radial-from-70% mask-radial-to-85% "
              src={images}
              alt="neuro-forge"
            />
          </div>
        </div>
        <div className="flex flex-col  items-center justify-center max-w-[600px] w-[50%] text-justify gap-10 h-screen">
          <h1 className="font-bold text-4xl">NUESTRA FUNDADORA</h1>
          <p>
            Roxana Aparicio es una apasionada de la automatización, la
            inteligencia artificial y la transformación digital. Con más de 7
            años de experiencia en ventas, administración y atención al cliente,
            descubrió en la tecnología una forma de simplificar procesos y
            liberar tiempo para enfocarse en lo que realmente importa: hacer
            crecer los negocios. Hace más de 5 años decidió seguir esa pasión y
            desde entonces ha ayudado a emprendedores y empresas a integrar
            soluciones automatizadas que mejoran la productividad y generan
            resultados reales. Roxana cree firmemente que el trabajo no debería
            estar atado a un lugar físico. Su misión es inspirar a otros a
            construir carreras flexibles y negocios escalables desde cualquier
            parte del mundo, donde la tecnología sea la clave para alcanzar
            libertad y equilibrio.
          </p>
        </div>
      </div>
    </>
  );
}
