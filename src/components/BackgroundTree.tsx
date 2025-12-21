const BackgroundTree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.4, 0.6, 1.5, 6]} />
                <meshStandardMaterial color="#2e1005" flatShading />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[2.2, 3.3, 6]} />
                <meshStandardMaterial color="#0f4c25" flatShading />
            </mesh>
            <mesh position={[0, 3.5, 0]}>
                <coneGeometry args={[1.5, 2.5, 6]} />
                <meshStandardMaterial color="#14532d" flatShading />
            </mesh>
        </group>
    );
};

export default BackgroundTree;
