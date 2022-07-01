import "./js/libs/weapp-adapter";
import "./js/libs/symbol";
import * as THREE from "./js/libs/three";
import "./js/libs/weapp-adapter";

const context = canvas.getContext('webgl')
wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
});

export default class Main {
  scene
  camera
  renderer
  cube
  constructor() {
    this.start();
    this.login();
    this.animate()
  }

  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: "login",
      success: (res) => {
        window.openid = res.result.openid;
      },
      fail: (err) => {
        console.error("get openid failed with error", err);
      },
    });
  }

  start() {
    //实例化场景容器
    this.scene = new THREE.Scene();
    //摄像机
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ context, canvas: canvas });
    this.camera.position.set(30, 30, 100);
    //设定宽高以及分辩率；
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this), canvas);

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}

new Main();
