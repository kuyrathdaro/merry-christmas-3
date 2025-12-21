import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Vec3 = [number, number, number];

const Reindeer = ({ position, offset }: { position: Vec3, offset: number }) => {
    const group = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (group.current) {
            const t = clock.getElapsedTime() * 5 + offset;
            group.current.position.y = position[1] + Math.sin(t) * 0.2;
            group.current.rotation.z = Math.sin(t) * 0.1;
        }
    });

    return (
        <group ref={group} position={position}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
                <meshStandardMaterial color="#8d5524" roughness={0.9} />
            </mesh>

            <group position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <mesh position={[-0.1, 0.1, 0]} rotation={[0, 0, -0.2]}>
                    <cylinderGeometry args={[0.1, 0.14, 0.4]} />
                    <meshStandardMaterial color="#8d5524" roughness={0.9} />
                </mesh>

                <group position={[0.1, 0.4, 0]}>
                    <mesh>
                        <boxGeometry args={[0.25, 0.25, 0.22]} />
                        <meshStandardMaterial color="#8d5524" />
                    </mesh>
                    <mesh position={[0.2, -0.05, 0]}>
                        <boxGeometry args={[0.2, 0.15, 0.18]} />
                        <meshStandardMaterial color="#784421" />
                    </mesh>
                    <mesh position={[0.3, -0.05, 0]}>
                        <sphereGeometry args={[0.07]} />
                        <meshStandardMaterial color="#1f2937" emissive="#000" emissiveIntensity={0.8} />
                    </mesh>
                    <mesh position={[-0.1, 0.15, 0.15]} rotation={[0, 0, 0.5]}>
                        <coneGeometry args={[0.04, 0.15, 8]} />
                        <meshStandardMaterial color="#8d5524" />
                    </mesh>
                    <mesh position={[-0.1, 0.15, -0.15]} rotation={[0, 0, 0.5]}>
                        <coneGeometry args={[0.04, 0.15, 8]} />
                        <meshStandardMaterial color="#8d5524" />
                    </mesh>

                    <group position={[0, 0.2, 0]}>
                        <mesh position={[0, 0.15, 0.1]} rotation={[0, 0, 0.2]}>
                            <cylinderGeometry args={[0.015, 0.015, 0.3]} />
                            <meshStandardMaterial color="#fcd34d" />
                        </mesh>
                        <mesh position={[0, 0.15, -0.1]} rotation={[0, 0, 0.2]}>
                            <cylinderGeometry args={[0.015, 0.015, 0.3]} />
                            <meshStandardMaterial color="#fcd34d" />
                        </mesh>
                    </group>
                </group>
            </group>

            <mesh position={[0.3, -0.4, 0.15]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.04, 0.03, 0.6]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>
            <mesh position={[0.3, -0.4, -0.15]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.04, 0.03, 0.6]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>
            <mesh position={[-0.3, -0.4, 0.15]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.04, 0.03, 0.6]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>
            <mesh position={[-0.3, -0.4, -0.15]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.04, 0.03, 0.6]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>

            <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, 2]}>
                <coneGeometry args={[0.05, 0.15, 8]} />
                <meshStandardMaterial color="#8d5524" />
            </mesh>
        </group>
    );
};

const SantaSleigh = () => {
    const group = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (group.current) {
            const t = clock.getElapsedTime() * 0.15;
            const x = Math.sin(t * 2) * 20;
            const z = Math.cos(t) * 8;
            const y = 5 + Math.sin(t * 3) * 1.5;
            group.current.position.set(x, y, z);
            const dx = Math.cos(t * 2) * 40;
            const dz = -Math.sin(t) * 8;
            group.current.rotation.y = Math.atan2(dx, dz) - Math.PI / 2;
            group.current.rotation.z = -dx * 0.005;
            group.current.rotation.x = 0;
            // subtle head bob/look idle to make Santa feel alive
            if (headRef.current) {
                const time = clock.getElapsedTime();
                const targetY = Math.sin(time * 0.8) * 0.08; // small left/right
                const targetX = Math.sin(time * 1.2) * 0.02; // small nod
                headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.06);
                headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.06);
            }
        }
    });

    return (
        <group ref={group}>
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 0.8, 0.8]} />
                <meshStandardMaterial color="#b91c1c" />
            </mesh>

            <mesh position={[0, -0.6, 0.3]}>
                <boxGeometry args={[2, 0.1, 0.1]} />
                <meshStandardMaterial color="silver" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.6, -0.3]}>
                <boxGeometry args={[2, 0.1, 0.1]} />
                <meshStandardMaterial color="silver" metalness={0.8} roughness={0.2} />
            </mesh>

            <group position={[0.2, 0.5, 0]}>
                    <mesh position={[0, 0, 0]}> {/* Body */}
                        <sphereGeometry args={[0.45, 16, 16]} />
                        <meshStandardMaterial color="#ef4444" />
                    </mesh>

                    <group position={[0, 0.55, 0]}> {/* Head group */}
                        <mesh> {/* Head */}
                            <sphereGeometry args={[0.28, 20, 20]} />
                            <meshStandardMaterial color="#fca5a5" roughness={0.6} />
                        </mesh>

                        {/* Face: face forward relative to sleigh (parent) */}
                        <group ref={headRef} position={[0, 0.05, 0]} rotation={[0, 0, 0]}> 
                            <mesh position={[-0.08, 0.02, 0]}> {/* Left eye */}
                                <sphereGeometry args={[0.03, 8, 8]} />
                                <meshStandardMaterial color="#111827" />
                            </mesh>
                            <mesh position={[0.08, 0.02, 0]}> {/* Right eye */}
                                <sphereGeometry args={[0.03, 8, 8]} />
                                <meshStandardMaterial color="#111827" />
                            </mesh>
                            <mesh position={[0, -0.03, 0]}> {/* Nose */}
                                <sphereGeometry args={[0.06, 12, 12]} />
                                <meshStandardMaterial color="#ef4444" />
                            </mesh>
                        </group>
                    </group>

                    {/* Hat (refined): recentered on head, removed odd Z offsets */}
                    <group position={[0, 0.88, 0]} rotation={[0, 0, -0.04]}> 
                        <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0.02]}> {/* main cone sits just above head */}
                            <coneGeometry args={[0.2, 0.5, 16]} />
                            <meshStandardMaterial color="#dc2626" roughness={0.65} />
                        </mesh>
                        <mesh position={[0, 0.06, 0]}> {/* thin white band centered */}
                            <cylinderGeometry args={[0.34, 0.34, 0.05, 12]} />
                            <meshStandardMaterial color="white" roughness={0.9} />
                        </mesh>
                    </group>

                    {/* Belt */}
                    <mesh position={[0, -0.05, 0.36]} rotation={[0, 0, 0]}> 
                        <boxGeometry args={[0.9, 0.12, 0.12]} />
                        <meshStandardMaterial color="#1f2937" />
                    </mesh>

                    {/* Beard (clustered spheres) - attached closer to head so it aligns naturally */}
                    <group position={[0, 0.18, 0.28]} rotation={[-0.12, 0, 0]}> 
                        <mesh position={[0, -0.02, 0.12]}> 
                            <sphereGeometry args={[0.18, 14, 14]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.82} metalness={0.03} />
                        </mesh>
                        <mesh position={[-0.14, -0.02, 0.08]}> 
                            <sphereGeometry args={[0.14, 12, 12]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.82} metalness={0.03} />
                        </mesh>
                        <mesh position={[0.14, -0.02, 0.08]}> 
                            <sphereGeometry args={[0.14, 12, 12]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.82} metalness={0.03} />
                        </mesh>
                        <mesh position={[0, -0.12, 0.08]}> 
                            <sphereGeometry args={[0.16, 12, 12]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.86} metalness={0.02} />
                        </mesh>
                        <mesh position={[0, -0.22, 0.06]}> {/* extra lower tuft */}
                            <sphereGeometry args={[0.12, 12, 12]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.86} metalness={0.02} />
                        </mesh>
                        <mesh position={[0.18, -0.18, 0.02]}> {/* side tuft */}
                            <sphereGeometry args={[0.10, 12, 12]} />
                            <meshStandardMaterial color="#ffffff" roughness={0.86} metalness={0.02} />
                        </mesh>
                    </group>
            </group>

            {/* Reindeers pushed forward for better composition */}
            <Reindeer position={[2.2, 0.1, 0.6]} offset={0} />
            <Reindeer position={[2.2, 0.1, -0.6]} offset={1} />

            <Reindeer position={[3.6, 0.2, 0.6]} offset={2} />
            <Reindeer position={[3.6, 0.2, -0.6]} offset={3} />

            {/* Longer reins to visually connect sleigh to reindeers */}
            <mesh position={[1.6, 0.25, 0]}>
                <boxGeometry args={[6, 0.04, 0.04]} />
                <meshStandardMaterial color="brown" />
            </mesh>

            {/* Gift sack on the sleigh */}
            <mesh position={[-0.6, 0.4, -0.2]} rotation={[0, 0.2, 0]}> 
                <cylinderGeometry args={[0.22, 0.28, 0.6, 12]} />
                <meshStandardMaterial color="#065f46" />
            </mesh>
        </group>
    );
};

export default SantaSleigh;
