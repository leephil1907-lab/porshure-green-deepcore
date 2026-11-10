import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
uniform float angle;
uniform float radius;
uniform float indexf;
uniform float total;
varying vec2 vUv;
void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 cameraToVertex = normalize(worldPosition - cameraPosition);
  float t = time;
  float viewDot = abs(dot(normalize(normalMatrix * normal), cameraToVertex));
  float zOffset = (1.0 - viewDot) * 0.5;
  pos.z += zOffset * cos(pos.x * 5.0 + t) * 0.2;
  vec4 mvPosition = vec4(pos, 1.0);
  float angleStep = 6.28 / total;
  float cAngle = angle + (angleStep * indexf);
  vec3 center = vec3(cos(cAngle) * radius, sin(cAngle) * radius, 0.0);
  vec3 right = vec3(-sin(cAngle), cos(cAngle), 0.0);
  vec3 up = vec3(0.0, 0.0, 1.0);
  mvPosition.xyz = right * pos.x + up * pos.y + center;
  vec4 p = projectionMatrix * viewMatrix * mvPosition;
  gl_Position = p;
  gl_Position.z = p.w * 0.00001;
  vUv = uv;
}
`;

const fragmentShader = `
uniform sampler2D texture1;
uniform float indexf;
uniform float total;
varying vec2 vUv;
void main() {
  vec4 texColor = texture2D(texture1, vUv);
  float darkenFactor = 0.5 + (indexf / total) * 0.5;
  texColor.rgb *= darkenFactor;
  gl_FragColor = texColor;
}
`;

const imageUrls = [
  '/images/31583.jpg', '/images/31585.jpg', '/images/31584.jpg',
  '/images/31589.jpg', '/images/31588.jpg', '/images/31587.jpg',
  '/images/25605.jpg', '/images/25622.jpg', '/images/29838.jpg',
  '/images/29839.jpg', '/images/29840.jpg', '/images/29818.jpg',
  '/images/25578.gif', '/images/logo.png',
];

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "1";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const textureLoader = new THREE.TextureLoader();
    const numImages = imageUrls.length;
    const group = new THREE.Group();
    group.rotation.x = Math.PI / 8;
    scene.add(group);

    const meshes: THREE.Mesh[] = [];
    imageUrls.forEach((url, index) => {
      const texture = textureLoader.load(url);
      const geometry = new THREE.PlaneGeometry(1.4, 1.8, 16, 16);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          texture1: { value: texture },
          angle: { value: 0.0 },
          radius: { value: 4.0 },
          indexf: { value: index },
          total: { value: numImages },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      meshes.push(mesh);
    });

    let mouseX = 0;
    let rotationSpeed = 0.003;
    let animationFrameId: number;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = ((event.clientX / window.innerWidth) - 0.5) * 2;
    };
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const targetSpeed = 0.003 + mouseX * 0.005;
      rotationSpeed += (targetSpeed - rotationSpeed) * 0.1;
      group.rotation.z += rotationSpeed;
      meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = performance.now() * 0.001;
        mat.uniforms.angle.value = group.rotation.z;
        mesh.lookAt(camera.position);
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      meshes.forEach((mesh) => { mesh.geometry.dispose(); (mesh.material as THREE.ShaderMaterial).dispose(); });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <img src="/images/hero-main.jpg" alt="" className="h-full w-full object-cover" style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
