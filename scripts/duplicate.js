var glob = require('glob');

var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));
const name = argv.name;

if (!name) {
  console.log('--name is necessary');
  process.exit();
}

const srcDir = './';
const destDir = '../' + name;

console.log('will create module:', name);

if (fs.existsSync(destDir)) {
  console.log('Directory', name, 'exists in modules folder', destDir);
  process.exit();
}

fs.copySync(srcDir, destDir, {overwrite: true | false});

var exec = require('child_process').execSync;

exec(`cd ${destDir} && npx react-native-rename ${name}`);

// var exec = require('child_process').execSync;

// exec(`cd ${destDir} && npx react-native-rename ${name}`);

// // glob(destDir + '/**/*', function (err, files) {
// //   for (let file of files) {
// //     try {
// //       var data2 = fs.readFileSync(file, 'utf8');
// //       var result = data2.replace(new RegExp('appstarter', 'g'), `${name}`);
// //       fs.writeFileSync(file, result, 'utf8');
// //     } catch (error) {
// //       console.error('Error: ', file);
// //     }

// //     try {
// //       if (file.includes('appstarter')) {
// //         let oldFile = file;
// //         file = file.replace(new RegExp('appstarter', 'g'), `${name}`);
// //         console.log('OLD', oldFile, ' > ', file);
// //         fs.renameSync(oldFile, file);
// //       }
// //     } catch (error) {
// //       console.error('Error: ', file);
// //     }
// //   }
// // });
