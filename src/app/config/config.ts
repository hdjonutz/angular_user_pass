import jsonConfig from '../../../package.json';
export const config = {
  // apiUrl: '../server-http/index.php',
  projName: jsonConfig.name,
  nameProj: jsonConfig.nameProj,
  version: jsonConfig.version,
  // apiUrl: '../server_composer/vendor/src/index.php',
  // host: 'localhost',

  apiUrl: '/angular_rugaciuni3/server_composer/vendor/src/index.php',
  // host: '192.168.1.198',
  // host: '192.168.0.32',
  host: 'localhost',
  type: 'http://',
  port: 80,
  proxy: true,
  fakeLogin: true,
  email: 'dih.ortodox@gmail.com',
  password: '20DorT?odox*yY24'
}
