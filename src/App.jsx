import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { SocketManager } from "./components/SocketManager";

function App() {
  return (
    <>
      <SocketManager />
      <Canvas shadows camera={{ position: [4, 5, 4], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
