const encryptLib = require('./server/modules/encryption');

const password = 'ChangeMe12!';

const hash = encryptLib.encryptPassword(password);

console.log('Admin password hash:', hash);


