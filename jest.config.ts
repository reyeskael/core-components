import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
	testEnvironment: "jsdom",
	transform: {
		...tsJestTransformCfg,
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: [
		'<rootDir>/jest.setup.ts'
	]
};
