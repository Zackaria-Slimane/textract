/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', // Feel free to modify/remove this option
	poweredByHeader: false,
	devIndicators: {
		buildActivityPosition: 'bottom-left',
	},

	// Indicate that these packages should not be bundled by webpack
	experimental: {
		serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
	},
};

module.exports = nextConfig;
