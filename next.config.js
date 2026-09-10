import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.simpleicons.org'],
  },
  webpack(config, { webpack, isServer }) {
    // Force a single Three.js instance (fixes Vanta + Spline both bundling three.js)
    config.resolve.alias = {
      ...config.resolve.alias,
      three: path.resolve(__dirname, 'node_modules/three'),
    };

    // The Spline runtime dynamically loads DRACO and WASM files at runtime via CDN.
    // Webpack tries (and fails) to statically bundle them. We must ignore those imports.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /boolean_wasm_bg\.wasm/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /draco_(decoder|wasm_wrapper)(\.wasm|\.js)?$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /gltf\/draco_wasm_wrapper/,
      })
    );

    return config;
  },
};

export default nextConfig;
