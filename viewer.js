/* 3D viewer for the Scentry CAD model. It builds the model from models/scentry-model.json.
   You normally never need to edit this file. */
import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

const root = document.getElementById('model-viewer');
if (root) start(root);

function start(root) {
  const stage = root.querySelector('.viewer-stage'), note = root.querySelector('.viewer-note');
  const buttons = root.querySelectorAll('[data-lid]');
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;

  function fail(msg) { note.textContent = msg; note.hidden = false; root.classList.add('is-failed'); }

  function init() {
    if (started) return; started = true;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch (e) { fail('Your browser could not show the 3D model.'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    stage.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(60, 140, 90); scene.add(key);

    const camera = new THREE.PerspectiveCamera(32, 1, 1, 2000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; controls.enableZoom = false; controls.enableDamping = true;
    controls.minPolarAngle = 0.35; controls.maxPolarAngle = Math.PI * 0.62;
    controls.autoRotate = !REDUCE; controls.autoRotateSpeed = 1.6;
    renderer.domElement.style.touchAction = 'pan-y';          // vertical swipes still scroll the page on phones
    controls.addEventListener('start', () => { controls.autoRotate = false; });

    const holder = new THREE.Group(); holder.rotation.x = -Math.PI / 2;   // the CAD file is Z-up
    scene.add(holder);
    let lid = null, lidT = 0, lidTarget = 0;

    fetch(root.dataset.src).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(data => {
      data.parts.forEach(p => {
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(p.v, 3));
        g.setIndex(p.i);
        const flat = g.toNonIndexed(); flat.computeVertexNormals(); g.dispose();
        const glass = p.opacity < 1;
        const mat = new THREE.MeshStandardMaterial({
          color: p.color, roughness: glass ? 0.15 : 0.55, metalness: 0, transparent: glass || !!p.lid, opacity: p.opacity,
          depthWrite: !glass, side: glass ? THREE.DoubleSide : THREE.FrontSide
        });
        const mesh = new THREE.Mesh(flat, mat);
        if (glass) mesh.renderOrder = 2;
        if (p.lid) { lid = mesh; mesh.renderOrder = 3; }
        holder.add(mesh);
      });
      const box = new THREE.Box3().setFromObject(holder), c = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
      holder.position.sub(c);
      const dist = Math.max(size.y, size.x * 1.4) * 2.0;
      camera.position.set(dist * 0.62, dist * 0.34, dist * 0.82);
      controls.target.set(0, size.z * 0.04, 0); controls.update();
      root.classList.add('is-ready'); note.hidden = true;
      resize(); render();
    }).catch(() => fail('The 3D model could not be loaded.'));

    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    buttons.forEach(b => b.addEventListener('click', () => {
      lidTarget = b.dataset.lid === 'on' ? 0 : 1;
      buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      if (REDUCE) lidT = lidTarget;
      kick();
    }));

    let raf = 0, visible = true, last = 0;
    function render(now) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(((now || 0) - (last || now || 0)) / 1000, 0.05); last = now || 0;
      if (lid) {
        lidT += Math.sign(lidTarget - lidT) * Math.min(Math.abs(lidTarget - lidT), dt * 1.6);
        const e = lidT * lidT * (3 - 2 * lidT);
        lid.position.z = e * 90; lid.material.opacity = 1 - Math.max(0, e - 0.55) / 0.45 * 0.9; lid.visible = lid.material.opacity > 0.12;
      }
      controls.update(); renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    }
    function kick() { if (!raf && visible) { last = 0; raf = requestAnimationFrame(render); } }
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); }, { threshold: 0.05 }).observe(root);
    document.addEventListener('visibilitychange', () => { visible = document.visibilityState === 'visible'; if (visible) kick(); });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); init(); } }, { rootMargin: '400px' });
    io.observe(root);
  } else init();
}
