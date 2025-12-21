import { useMemo } from 'react';
import * as THREE from 'three';
import BlinkingLight from './BlinkingLight';

const TreeLights = () => {
    const pseudo = (n: number) => Math.abs(Math.sin(n) * 10000) % 1;
    const lights = useMemo(() => {
        const items = [] as Array<{ pos: [number, number, number]; color: string; angle: number }>;
        const colors = ['#ef4444', '#fbbf24', '#3b82f6'];
        for (let i = 0; i < 40; i++) {
            const h = pseudo(i + 7) * 3 + 1.5;
            const progress = (h - 1.5) / 3.5;
            const r = (1 - progress) * 2.0;
            const angle = pseudo(i + 17) * Math.PI * 2;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const color = colors[Math.floor(pseudo(i + 23) * colors.length)];
            items.push({ pos: [x, h, z], color, angle });
        }
        return items;
    }, []);

    // sort lights by angle so they map consistently to cable rings
    const ordered = useMemo(() => [...lights].sort((a, b) => a.angle - b.angle), [lights]);

    // define cable rings (heights and radii). Higher rings are smaller radius.
    const rings = useMemo(() => {
        const heights = [1.8, 2.6, 3.4, 4.2];
        const radii = [2.0, 1.7, 1.3, 0.9];
        return heights.map((h, i) => ({ height: h, radius: radii[i] }));
    }, []);

    // tube geometries for each ring with slight sag for realism
    const ringGeometries = useMemo(() => {
        return rings.map((r, ri) => {
            const segs = 256;
            const pts: THREE.Vector3[] = [];
            // sag amplitude scales with radius
            const sagAmp = 0.06 * (r.radius / 2);
            for (let i = 0; i <= segs; i++) {
                const a = (i / segs) * Math.PI * 2;
                // gentle sag using absolute sin to create symmetric droops
                const sag = Math.abs(Math.sin(a)) * sagAmp;
                const y = r.height - sag;
                pts.push(new THREE.Vector3(Math.cos(a) * r.radius, y, Math.sin(a) * r.radius));
            }
            const curve = new THREE.CatmullRomCurve3(pts, true);
            const geo = new THREE.TubeGeometry(curve, pts.length * 2, 0.02, 10, true);
            return { geo, curve };
        });
    }, [rings]);

    return (
        <group>
            {/* cable rings */}
            {ringGeometries.map((rg, i) => (
                <mesh key={i} geometry={rg.geo} castShadow>
                    <meshStandardMaterial color="#0d3b26" metalness={0.05} roughness={0.75} clearcoat={0.1} />
                </mesh>
            ))}

            {/* bulbs hang from nearest ring based on their height; connector rendered in world-space */}
            {ordered.map((l, i) => {
                const angle = Math.atan2(l.pos[2], l.pos[0]);
                // pick ring index closest to bulb's y
                let bestIdx = 0;
                let bestDiff = Infinity;
                for (let ri = 0; ri < rings.length; ri++) {
                    const d = Math.abs(rings[ri].height - l.pos[1]);
                    if (d < bestDiff) { bestDiff = d; bestIdx = ri; }
                }
                const ring = rings[bestIdx];
                const attachPoint = new THREE.Vector3(Math.cos(angle) * ring.radius, ring.height, Math.sin(angle) * ring.radius);
                const bulbPos = new THREE.Vector3(l.pos[0], l.pos[1], l.pos[2]);
                const dir = new THREE.Vector3().subVectors(bulbPos, attachPoint);
                const len = dir.length();
                const mid = attachPoint.clone().add(dir.clone().multiplyScalar(0.5));
                const quat = new THREE.Quaternion();
                if (len > 0.0001) quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

                return (
                    <group key={i}>
                        {/* small hook at attach point */}
                        <mesh position={[attachPoint.x, attachPoint.y, attachPoint.z]}>
                            <sphereGeometry args={[0.03, 8, 8]} />
                            <meshStandardMaterial color="#2b2b2b" metalness={0.8} roughness={0.25} />
                        </mesh>

                        {/* connector */}
                        {len > 0.0001 && (
                            <mesh position={[mid.x, mid.y, mid.z]} quaternion={quat}>
                                <cylinderGeometry args={[0.0125, 0.0125, len, 6]} />
                                <meshStandardMaterial color="#072612" metalness={0.1} roughness={0.6} />
                            </mesh>
                        )}

                        {/* bulb */}
                        <BlinkingLight
                            position={[bulbPos.x, bulbPos.y, bulbPos.z]}
                            color={l.color}
                        />
                    </group>
                );
            })}
        </group>
    );
};

export default TreeLights;
