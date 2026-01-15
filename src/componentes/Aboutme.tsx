
export default function Aboutme() {
  return (
    <div className="flex flex-row  w-full h-screen  text-white ">
      <div className="flex flex-col items-center justify-center ml-[100px] p-[50px] w-[50%] text-justify gap-5 h-full relative ">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />
        <h1 className="font-bold text-4xl">SOBRE NOSOTROS</h1>
        <p>
          Neuro Forge es una agencia de vanguardia especializada en
          automatización, inteligencia artificial y asesorías digitales. Nos
          dedicamos a diseñar soluciones personalizadas que optimizan procesos y
          permiten a los negocios escalar de manera eficiente y sostenible.
        </p>
        <p>
          Ayudamos a las empresas a integrar tecnologías avanzadas, mejorar la
          seguridad de su presencia digital y asegurar un rendimiento óptimo
          para sus proyectos en línea. Así capacitación para formar asistentes
          virtuales expertos en las tecnologías que están revolucionando el
          mercado.
        </p>
        <p>
          Nuestra mision Capacitar a la próxima generación de asistentes
          virtuales en el uso de herramientas avanzadas de IA y automatización,
          mientras ayudamos a las empresas a integrar tecnologías inteligentes
          que mejoren su eficiencia, productividad. En NeuroForge, creemos que
          la tecnología no solo debe facilitar el trabajo, sino también impulsar
          el crecimiento continuo.
        </p>

        <div className="flex w-full justify-between items-start mt-2">
          <div className="flex flex-col ju">
            <span className="text-4xl font-bold items-center">300+</span>
            <p className="text-sm">PRODUCTOS</p>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold items-center">100+</span>
            <p className="text-sm">PLANTILLA</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">215</span>
            <p className="text-sm font-bold">PLANTILLA MOVIL</p>
          </div>
        </div>
      </div>
      <div className="flex w-[50%] items-centers  justify-center  ">
        <div className="flex w-[70%] h-[70%] object-fill rounded-br-full m-auto  overflow-hidden ">
          <h1>FALTA MANO ROBOTICA</h1>
          {/* <img
          className="w-full h-full object-cover"
          src="/Images/fundadora.jpeg"
          alt="neuro-forge"
        />*/}
        </div>
      </div>
    </div>
  );
}
