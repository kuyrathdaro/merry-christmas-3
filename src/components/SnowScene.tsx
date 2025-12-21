import { Sparkles } from '@react-three/drei';

const SnowScene = () => {
    return (
        <Sparkles
            count={500}
            scale={[30, 20, 30]}
            size={4}
            speed={0.5}
            opacity={0.8}
            color="#ffffff"
        />
    );
};

export default SnowScene;
