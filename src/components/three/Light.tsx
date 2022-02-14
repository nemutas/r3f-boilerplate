import { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { GUIController } from '../../modules/gui';
import { lightState } from '../../modules/store';

export const Lights: VFC = () => {
	const lightRef = useRef<THREE.DirectionalLight>(null)
	const { scene } = useThree()

	// add helper
	useEffect(() => {
		const helper = new THREE.CameraHelper(lightRef.current!.shadow.camera)
		helper.visible = lightState.helper
		helper.name = 'DirectionalLightHelper'
		scene.add(helper)
	}, [scene])

	// add controller
	const gui = GUIController.instance.setFolder('Light')
	gui.addCheckBox(lightState, 'helper')

	useFrame(() => {
		const helper = scene.getObjectByName('DirectionalLightHelper') as THREE.CameraHelper
		helper.visible = lightState.helper
	})

	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight
				ref={lightRef}
				position={[5, 10, 5]}
				castShadow
				shadow-camera-far={30}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
			/>
		</>
	)
}
