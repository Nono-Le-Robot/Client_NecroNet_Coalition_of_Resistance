import { ContactShadows, Cylinder, Environment, OrbitControls, useCursor } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Adventurer } from "./Adventurer";
import { useAtom } from "jotai";
import { charactersAtom, socket } from "./SocketManager";
import { useState } from "react";
import * as THREE from 'three'



export const Experience = () => {

  const [characters] = useAtom(charactersAtom)
  const [onFloor, setOnFloor] = useState(false);
  const [animation, setAnimation] = useState("walk")
  useCursor(onFloor)

  return (
    <>
      <OrbitControls />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
        onClick={(e) => {
          socket.emit("move", [e.point.x, 0, e.point.z])
          setAnimation("walk");
        }}
        onContextMenu={(e) => {
          socket.emit("move", [e.point.x, 0, e.point.z])
          setAnimation("run");
        }}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* {LIGHTS} */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      {/* {MODELS} */}
      {characters.map((character) => (
        <Adventurer
          key={character.id}
          position={new THREE.Vector3(character.position[0], character.position[1], character.position[2])}
          hairColor={character.hairColor}
          topColor="#343435"
          bottomColor="#381101"
          backpackMainColor="#000000"
          backpackSecondaryColor="#ffffff"
          backpackTopColor="#b3b3b3"
          shoesColor="#1b0e00"
          actionAnimation={animation}
        />
      ))}
    </>
  );
};
