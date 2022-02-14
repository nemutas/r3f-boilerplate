import React, { VFC } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Lights } from './Light';
import { Objects } from './Objects';

export const TCanvas: VFC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 3, 8],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			shadows>
			{/* scene */}
			<color attach="background" args={['#000']} />
			{/* camera controller */}
			<OrbitControls attach="orbitControls" />
			{/* lights */}
			<Lights />
			{/* objects */}
			<Objects />
			{/* helper */}
			<Stats />
		</Canvas>
	)
}
