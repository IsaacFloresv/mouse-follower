import { useEffect, useState } from "react";

const FollowerMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    //cleanup
    //->CUando el componente se desmonta
    //-> cuando cambia las dependencias, antes de ejecutar
    //el efecto nuevo
    return () => {
      window.removeEventListener("pointermove", handleMove);
      setPosition({ x: 100, y: 100 });
    };
  }, [enabled]);

  //Change body className
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)
  
    return () =>{ //--> Cleanup method
      document.body.classList.remove('no-cursor')
    }
  },[enabled])


  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activiar"} seguimiento
      </button>
    </>
  );
};

function App() {
  return( 
    <main>
      <FollowerMouse/>
    </main>
  )
}

export default App;
