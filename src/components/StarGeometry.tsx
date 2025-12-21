import { useMemo } from 'react';
import * as THREE from 'three';

const StarGeometry = ({ scale = 1 }: { scale?: number }) => {
    const starShape = useMemo(() => {
        const shape = new THREE.Shape();
        const outerRadius = 0.5;
        const innerRadius = 0.25;
        const spikes = 5;

        for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const a = (i / (spikes * 2)) * Math.PI * 2;
            const x = Math.cos(a + Math.PI / 2) * r;
            const y = Math.sin(a + Math.PI / 2) * r;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        shape.closePath();
        return shape;
    }, []);

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };

    return (
        <mesh castShadow scale={[scale, scale, scale]}>
            <extrudeGeometry args={[starShape, extrudeSettings]} />
            <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={2} toneMapped={false} />
        </mesh>
    );
};

export default StarGeometry;
