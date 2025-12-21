import TreeNode from './TreeNode';
import StarGeometry from './StarGeometry';
import TreeLights from './TreeLights';

const ChristmasTree = () => {
    return (
        <group position={[0, -2, 0]}>
            <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.4, 0.6, 1.5, 8]} />
                <meshStandardMaterial color="#3e2723" flatShading />
            </mesh>
            <TreeNode position={[0, 1.5, 0]} scale={2.2} color="#166534" />
            <TreeNode position={[0, 2.5, 0]} scale={1.8} color="#15803d" />
            <TreeNode position={[0, 3.5, 0]} scale={1.4} color="#16a34a" />
            <TreeNode position={[0, 4.3, 0]} scale={1.0} color="#22c55e" />

            <group position={[0, 5.3, -0.1]}>
                <StarGeometry scale={1} />
            </group>
            <TreeLights />
        </group>
    );
};

export default ChristmasTree;
