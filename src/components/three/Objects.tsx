import gsap from 'gsap';
import { useRef, VFC } from 'react';
import { Box, Plane } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GUIController } from '../../modules/gui';
import { boxState } from '../../modules/store';

export const Objects: VFC = () => {
	const boxRef = useRef<THREE.Mesh>(null)

	// add controller
	const gui = GUIController.instance.setFolder('Box')
	gui.addColor(boxState, 'color')
	gui.addNumericSlider(boxState, 'metalness', 0, 1, 0.01)
	gui.addNumericSlider(boxState, 'roughness', 0, 1, 0.01)

	useFrame(() => {
		boxRef.current!.rotation.x += 0.005
		boxRef.current!.rotation.y += 0.005

		const material = boxRef.current!.material as THREE.MeshStandardMaterial
		material.color.set(boxState.color)
		material.metalness = boxState.metalness
		material.roughness = boxState.roughness
	})

	const handlePointerEnter = () => {
		gsap.to(boxRef.current!.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1, ease: 'elastic.out(1, 0.3)' })
	}

	const handlePointerLeave = () => {
		gsap.to(boxRef.current!.scale, { x: 1, y: 1, z: 1, duration: 1, ease: 'elastic.out(1, 0.3)' })
	}

	return (
		<>
			<Box
				ref={boxRef}
				args={[1, 1, 1]}
				position={[0, 2, 0]}
				castShadow
				receiveShadow
				onPointerEnter={handlePointerEnter}
				onPointerLeave={handlePointerLeave}>
				<meshStandardMaterial {...boxState} />
			</Box>
			<Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<meshStandardMaterial />
			</Plane>
		</>
	)
}
