import { Environment, OrbitControls, useCursor, useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Adventurer } from "./Adventurer";
import { useAtom } from "jotai";
import { charactersAtom, mapAtom, socket } from "./SocketManager";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import { Item } from "./Item";
import { useFrame } from "@react-three/fiber";



export const Experience = ({ }) => {
  const [characters] = useAtom(charactersAtom)
  const [map] = useAtom(mapAtom)
  const [onFloor, setOnFloor] = useState(false);
  const [animation, setAnimation] = useState("walk")
  const rigidBodyChar = useRef();
  useCursor(onFloor)





  return (
    <>
      <OrbitControls />
      <RigidBody type="fixed">
        <mesh
          rotation-x={-Math.PI / 2}
          position-x={map.size[0] / 2}
          position-y={-0.001}
          position-z={map.size[1] / 2}
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
          <planeGeometry args={map.size} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      </RigidBody>
      {/* {LIGHTS} */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      {/* <ContactShadows blur={2} /> */}
      {/* {MODELS} */}
      {/* {ITEMS} */}
      {map.items.map((item, idx) => (
        <RigidBody type="fixed" colliders={item.name === 'GasTank' ? "trimesh" : ""} >
          <Item key={`${item.name}-${idx}`} item={item} />
        </RigidBody >
      ))}
      {/* {PLAYERS} */}
      {
        characters.map((character) => (
          <RigidBody colliders={false} name="character" >
            <Adventurer
              key={character.id}
              id={character.id}
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
          </RigidBody>
        ))
      }1
    </>
  );
};
