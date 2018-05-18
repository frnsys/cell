const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 10000;
const D = 1;

class Scene {
  constructor(opts) {
    opts.enableControls = opts.enableControls == undefined ? true : opts.enableControls;
    opts.width = opts.width || window.innerWidth;
    opts.height = opts.height || window.innerHeight;
    this.opts = opts;


    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(opts.width, opts.height);
    this.renderer.setClearColor(0xeeeeee, 0);
    document.body.appendChild(this.renderer.domElement);

    // this.camera = new THREE.PerspectiveCamera(
    //   VIEW_ANGLE,
    //   opts.width/opts.height,
    //   NEAR,
    //   FAR);
    let aspect = opts.width/opts.height;
    this.camera = new THREE.OrthographicCamera(-D*aspect, D*aspect, D, -D, NEAR, FAR);
    window.cam = this.camera;
    // this.camera.zoom = 0.00095;
    // this.camera.position.y = -50;
    // this.camera.position.z = 400;
    this.camera.zoom = 0.015;
    // this.camera.position.y = -50;
    this.camera.position.z = 400;
    this.camera.updateProjectionMatrix();

    if (opts.enableControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableRotate = true;
      // for orthographic
      this.controls.maxZoom = 0.4;
      this.controls.minZoom = 0.000001;
      // for perspective
      this.controls.minDistance = 400;
      this.controls.maxDistance = 1200;
    }

    window.addEventListener('resize', () => {
      this.camera.aspect = opts.width/opts.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(opts.width, opts.height);
    }, false);
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
