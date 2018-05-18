class Ribosome {
  constructor() {
    this.scene = new Scene({
      enableControls: true
    });
    this.scene.controls.autoRotate = true;
    this.scene.controls.autoRotateSpeed = 0.5;

    this.loadModel();
  }

  loadModel() {
    let colors = {
      carbon: 0x888888,
      oxygen: 0xff0000,
      nitrogen: 0x0000ff,
      sulfur: 0xfcf120,
      zinc: 0xffffff
    };
    let mats = {};
    let geos = {};
    Object.keys(colors).forEach((el) => {
      mats[el] = new THREE.PointsMaterial({color: colors[el], size: 1.0});
      geos[el] = new THREE.Geometry();
    });
    let onSuccess = (data) => {
      data.forEach((d) => {
        let el = Object.keys(colors).filter((el) => {
          return d.name.toLowerCase().indexOf(el) !== -1;
        })[0];
        var point = new THREE.Vector3();
        if (d.position) {
          point.x = d.position[0];
          point.y = d.position[1];
          point.z = d.position[2];
        }
        geos[el].vertices.push(point);
      });
      Object.keys(colors).forEach((el) => {
        var atoms = new THREE.Points(geos[el], mats[el]);
        this.scene.add(atoms);
      });
    }

    fetch('/ribosome.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(res => res.json())
      .then((data) => onSuccess(data))
      .catch(err => { console.log(err) });
  }
}

let el = document.getElementById('ribosome');
let ribosome = new Ribosome();
el.appendChild(ribosome.scene.renderer.domElement);

function render(time) {
  ribosome.scene.render();
  requestAnimationFrame(render);
}
render();
