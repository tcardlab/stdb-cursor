var fs = require('fs');
var files = fs.readdirSync('./client/src/module_bindings/');

for (let file of files) {
  let fileName = file.split('.')[0]
  let imprtName = fileName.split('_').reduce(
    (a, s) => a+s[0].toUpperCase()+s.substring(1), ''
  )

  let imprt = `import ${imprtName} from '~/module_bindings/${fileName}'`
  console.log(imprt)
}
