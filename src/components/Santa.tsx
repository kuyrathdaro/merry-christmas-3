import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Vec3 = [number, number, number];

// Improved Reindeer - facing +X direction (forward)
const Reindeer = ({ position, offset }: { position: Vec3, offset: number }) => {
    const group = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (group.current) {
            const t = clock.getElapsedTime() * 4 + offset;
            // Galloping motion
            group.current.position.y = position[1] + Math.sin(t) * 0.12;
            group.current.rotation.x = Math.sin(t) * 0.06;
        }
    });

    return (
        <group ref={group} position={position}>
            {/* Body - horizontal capsule, facing +X */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.18, 0.45, 8, 12]} />
                <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>

            {/* Neck - facing forward */}
            <mesh position={[0.32, 0.18, 0]} rotation={[0, 0, -0.4]}>
                <cylinderGeometry args={[0.07, 0.09, 0.22, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Head - facing +X */}
            <group position={[0.45, 0.32, 0]}>
                <mesh>
                    <boxGeometry args={[0.18, 0.13, 0.11]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                {/* Snout */}
                <mesh position={[0.11, -0.02, 0]}>
                    <boxGeometry args={[0.08, 0.07, 0.08]} />
                    <meshStandardMaterial color="#654321" />
                </mesh>
                {/* Nose */}
                <mesh position={[0.16, -0.02, 0]}>
                    <sphereGeometry args={[0.035, 8, 8]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                {/* Eyes */}
                <mesh position={[0.04, 0.025, 0.055]}>
                    <sphereGeometry args={[0.018, 8, 8]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.04, 0.025, -0.055]}>
                    <sphereGeometry args={[0.018, 8, 8]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Antlers */}
                <mesh position={[-0.02, 0.1, 0.05]} rotation={[0.3, 0, 0.3]}>
                    <cylinderGeometry args={[0.012, 0.018, 0.18, 6]} />
                    <meshStandardMaterial color="#CD853F" />
                </mesh>
                <mesh position={[-0.02, 0.1, -0.05]} rotation={[-0.3, 0, 0.3]}>
                    <cylinderGeometry args={[0.012, 0.018, 0.18, 6]} />
                    <meshStandardMaterial color="#CD853F" />
                </mesh>
            </group>

            {/* Legs */}
            <mesh position={[0.18, -0.22, 0.07]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.025, 0.02, 0.3, 6]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.18, -0.22, -0.07]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.025, 0.02, 0.3, 6]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-0.18, -0.22, 0.07]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.025, 0.02, 0.3, 6]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-0.18, -0.22, -0.07]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.025, 0.02, 0.3, 6]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Tail */}
            <mesh position={[-0.35, 0.04, 0]} rotation={[0, 0, -0.7]}>
                <coneGeometry args={[0.025, 0.1, 6]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </group>
    );
};

const SantaSleigh = () => {
    const headRef = useRef<THREE.Group>(null);

    // Subtle head movement only (no flying)
    useFrame(({ clock }) => {
        if (headRef.current) {
            headRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.04;
        }
    });

    return (
        // Static position near the tree
        <group position={[-5, -1.55, 3.5]} rotation={[0, 0.5, 0]}>
            {/* ========== SLEIGH ========== */}
            {/* Main sleigh body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.6, 0.45, 0.9]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>

            {/* Sleigh front curve */}
            <mesh position={[0.7, 0.25, 0]} rotation={[0, 0, -0.3]}>
                <boxGeometry args={[0.5, 0.35, 0.9]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>

            {/* Sleigh back rest */}
            <mesh position={[-0.7, 0.35, 0]}>
                <boxGeometry args={[0.12, 0.5, 0.8]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>

            {/* Gold trim */}
            <mesh position={[0, 0.24, 0.47]}>
                <boxGeometry args={[1.7, 0.06, 0.03]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.24, -0.47]}>
                <boxGeometry args={[1.7, 0.06, 0.03]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Sleigh runners */}
            <mesh position={[0, -0.35, 0.35]}>
                <boxGeometry args={[2.0, 0.06, 0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.35, -0.35]}>
                <boxGeometry args={[2.0, 0.06, 0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Runner curves */}
            <mesh position={[1.0, -0.22, 0.35]} rotation={[0, 0, -0.7]}>
                <boxGeometry args={[0.35, 0.06, 0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[1.0, -0.22, -0.35]} rotation={[0, 0, -0.7]}>
                <boxGeometry args={[0.35, 0.06, 0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Runner supports */}
            <mesh position={[0.35, -0.17, 0.35]}>
                <boxGeometry args={[0.06, 0.25, 0.06]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>
            <mesh position={[-0.35, -0.17, 0.35]}>
                <boxGeometry args={[0.06, 0.25, 0.06]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>
            <mesh position={[0.35, -0.17, -0.35]}>
                <boxGeometry args={[0.06, 0.25, 0.06]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>
            <mesh position={[-0.35, -0.17, -0.35]}>
                <boxGeometry args={[0.06, 0.25, 0.06]} />
                <meshStandardMaterial color="#8B0000" />
            </mesh>

            {/* ========== SANTA - Facing FORWARD (same as reindeer) ========== */}
            <group position={[-0.25, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Body */}
                <mesh>
                    <sphereGeometry args={[0.35, 16, 16]} />
                    <meshStandardMaterial color="#DC143C" />
                </mesh>

                {/* White fur trim */}
                <mesh position={[0, -0.3, 0]}>
                    <cylinderGeometry args={[0.33, 0.37, 0.1, 16]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>

                {/* Belt */}
                <mesh position={[0, -0.08, 0]}>
                    <cylinderGeometry args={[0.37, 0.37, 0.08, 16]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* Belt buckle - on front facing +Z (which becomes +X after rotation) */}
                <mesh position={[0, -0.08, 0.38]}>
                    <boxGeometry args={[0.1, 0.06, 0.02]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* Head */}
                <group position={[0, 0.38, 0]} ref={headRef}>
                    {/* Face */}
                    <mesh>
                        <sphereGeometry args={[0.22, 20, 20]} />
                        <meshStandardMaterial color="#FDBBB7" roughness={0.6} />
                    </mesh>

                    {/* Eyes - on front (+Z, becomes +X after rotation) */}
                    <mesh position={[-0.07, 0.04, 0.18]}>
                        <sphereGeometry args={[0.03, 10, 10]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    <mesh position={[0.07, 0.04, 0.18]}>
                        <sphereGeometry args={[0.03, 10, 10]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>

                    {/* Rosy cheeks */}
                    <mesh position={[-0.12, -0.01, 0.15]}>
                        <sphereGeometry args={[0.04, 10, 10]} />
                        <meshStandardMaterial color="#FF6B6B" />
                    </mesh>
                    <mesh position={[0.12, -0.01, 0.15]}>
                        <sphereGeometry args={[0.04, 10, 10]} />
                        <meshStandardMaterial color="#FF6B6B" />
                    </mesh>

                    {/* Red nose */}
                    <mesh position={[0, -0.01, 0.21]}>
                        <sphereGeometry args={[0.04, 12, 12]} />
                        <meshStandardMaterial color="#FF0000" />
                    </mesh>

                    {/* White beard */}
                    <group position={[0, -0.12, 0.12]}>
                        <mesh position={[0, -0.04, 0.04]}>
                            <sphereGeometry args={[0.15, 14, 14]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                        <mesh position={[-0.1, 0, 0.02]}>
                            <sphereGeometry args={[0.1, 12, 12]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                        <mesh position={[0.1, 0, 0.02]}>
                            <sphereGeometry args={[0.1, 12, 12]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                        <mesh position={[0, -0.15, 0]}>
                            <sphereGeometry args={[0.12, 12, 12]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                        <mesh position={[0, -0.24, -0.02]}>
                            <sphereGeometry args={[0.08, 10, 10]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                    </group>

                    {/* Mustache */}
                    <mesh position={[-0.06, -0.05, 0.19]} rotation={[0, 0, 0.3]}>
                        <capsuleGeometry args={[0.025, 0.06, 6, 8]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh position={[0.06, -0.05, 0.19]} rotation={[0, 0, -0.3]}>
                        <capsuleGeometry args={[0.025, 0.06, 6, 8]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>

                    {/* Santa Hat - positioned at top of head */}
                    <group position={[0, 0.15, 0]}>
                        {/* White fur rim - sits on top of head */}
                        <mesh>
                            <cylinderGeometry args={[0.18, 0.22, 0.10, 16]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                        {/* Red cone - base sits on top of rim (cone origin is at center, so adjust y) */}
                        <mesh position={[0, 0.25, 0.01]} rotation={[0, 0, 0]}>
                            <coneGeometry args={[0.18, 0.38, 16]} />
                            <meshStandardMaterial color="#DC143C" />
                        </mesh>
                        {/* Pom-pom at the drooping tip */}
                        <mesh position={[-0.06, 0.48, 0.02]}>
                            <sphereGeometry args={[0.06, 12, 12]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                    </group>
                </group>

                {/* Arms holding reins */}
                <mesh position={[0.28, -0.1, 0.25]} rotation={[125 * (Math.PI / 180), 0.2, 0.3]}>
                    <capsuleGeometry args={[0.07, 0.28, 6, 8]} />
                    <meshStandardMaterial color="#DC143C" />
                    <mesh position={[0, 0.15, 0]}>
                        <sphereGeometry args={[0.07, 10, 10]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                </mesh>
                <mesh position={[-0.28, -0.1, 0.25]} rotation={[125 * (Math.PI / 180), -0.2, -0.3]}>
                    <capsuleGeometry args={[0.07, 0.28, 6, 8]} />
                    <meshStandardMaterial color="#DC143C" />
                    <mesh position={[0, 0.15, 0]}>
                        <sphereGeometry args={[0.07, 10, 10]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                </mesh>
            </group>

            {/* Gift sack - behind the sleigh */}
            <mesh position={[-1.0, 0.35, 0]} rotation={[0, 0.1, 0.2]}>
                <sphereGeometry args={[0.35, 12, 12]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[-0.95, 0.7, 0]}>
                <cylinderGeometry args={[0.12, 0.18, 0.14, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* ========== REINDEER - 4 in formation ========== */}
            {/* Front row (leaders) */}
            <Reindeer position={[2.8, 0, 0.4]} offset={0} />
            <Reindeer position={[2.8, 0, -0.4]} offset={1.2} />
            {/* Back row */}
            <Reindeer position={[1.8, 0, 0.55]} offset={0.6} />
            <Reindeer position={[1.8, 0, -0.55]} offset={1.8} />

            {/* ========== REINS - connecting all reindeer ========== */}
            {/* Main reins from sleigh to back row */}
            <mesh position={[0.9, 0.15, 0.35]} rotation={[0, 0.12, 0]}>
                <boxGeometry args={[1.4, 0.018, 0.018]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.9, 0.15, -0.35]} rotation={[0, -0.12, 0]}>
                <boxGeometry args={[1.4, 0.018, 0.018]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Reins from back row to front row leaders */}
            <mesh position={[2.3, 0.1, 0.47]} rotation={[0, 0.08, 0]}>
                <boxGeometry args={[1.1, 0.018, 0.018]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[2.3, 0.1, -0.47]} rotation={[0, -0.08, 0]}>
                <boxGeometry args={[1.1, 0.018, 0.018]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Cross-connecting reins between pairs */}
            <mesh position={[1.8, 0.08, 0]}>
                <boxGeometry args={[0.018, 0.018, 1.0]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[2.8, 0.06, 0]}>
                <boxGeometry args={[0.018, 0.018, 0.7]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </group>
    );
};

export default SantaSleigh;
