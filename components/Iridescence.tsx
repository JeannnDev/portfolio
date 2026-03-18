"use client"

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Iridescence.css';

interface IridescenceProps {
    colors?: [number, number, number][];
    speed?: number;
    amplitude?: number;
    mouseReact?: boolean;
    [key: string]: any;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  
  // Mixed base color from the 3 input colors
  vec3 baseMix = mix(uColor1, uColor2, cos(d * 0.5) * 0.5 + 0.5);
  baseMix = mix(baseMix, uColor3, sin(a * 0.5) * 0.5 + 0.5);

  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * baseMix;
  
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Iridescence({ colors = [[1, 1, 1], [0.8, 0.8, 0.8], [0.5, 0.5, 0.5]], speed = 1.0, amplitude = 0.1, mouseReact = true, ...rest }: IridescenceProps) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const rendererRef = useRef<Renderer | null>(null);
    const programRef = useRef<Program | null>(null);

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;

        // Initialize renderer 
        const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
        rendererRef.current = renderer;
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new Color(...colors[0]) },
                uColor2: { value: new Color(...colors[1]) },
                uColor3: { value: new Color(...colors[2] || colors[0]) },
                uResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
                uAmplitude: { value: amplitude },
                uSpeed: { value: speed }
            }
        });
        programRef.current = program;

        const mesh = new Mesh(gl, { geometry, program });

        let animateId: number;
        function update(t: number) {
            animateId = requestAnimationFrame(update);
            if (programRef.current) {
                programRef.current.uniforms.uTime.value = t * 0.001;
            }
            if (rendererRef.current) {
                rendererRef.current.render({ scene: mesh });
            }
        }
        animateId = requestAnimationFrame(update);
        ctn.appendChild(gl.canvas);

        function resize() {
            if (!rendererRef.current || !programRef.current) return;
            const gl = rendererRef.current.gl;
            rendererRef.current.setSize(ctn.offsetWidth, ctn.offsetHeight);
            programRef.current.uniforms.uResolution.value.set(
                gl.canvas.width,
                gl.canvas.height,
                gl.canvas.width / gl.canvas.height
            );
        }
        window.addEventListener('resize', resize, false);
        resize();

        function handleMouseMove(e: MouseEvent) {
            if (!programRef.current) return;
            const rect = ctn.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            mousePos.current = { x, y };
            if (programRef.current.uniforms.uMouse.value) {
                (programRef.current.uniforms.uMouse.value as Float32Array)[0] = x;
                (programRef.current.uniforms.uMouse.value as Float32Array)[1] = y;
            }
        }
        if (mouseReact) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (mouseReact) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (ctn.contains(gl.canvas)) {
                ctn.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            rendererRef.current = null;
            programRef.current = null;
        };
    }, []);

    // Update uniforms when props change without re-mounting the context
    useEffect(() => {
        if (programRef.current) {
            programRef.current.uniforms.uColor1.value.set(...colors[0]);
            programRef.current.uniforms.uColor2.value.set(...colors[1]);
            programRef.current.uniforms.uColor3.value.set(...(colors[2] || colors[0]));
            programRef.current.uniforms.uAmplitude.value = amplitude;
            programRef.current.uniforms.uSpeed.value = speed;
        }
    }, [colors, amplitude, speed]);

    return <div ref={ctnDom} className="iridescence-container" {...rest} />;
}
