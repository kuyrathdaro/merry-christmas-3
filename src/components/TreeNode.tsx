const TreeNode = ({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) => {
    return (
        <mesh position={position} castShadow receiveShadow>
            <coneGeometry args={[scale, scale * 1.5, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} flatShading />
        </mesh>
    );
};

export default TreeNode;
