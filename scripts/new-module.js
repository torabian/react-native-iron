var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));
var yaml = require('js-yaml');
const {getFieldsEntityBody} = require('./parseFormElements');

if (!argv.name) {
  console.log('--name is necessary');
  process.exit();
}

var emptyDTO = null;
var dtoInterface = null;
var writeEntities = null;
var fields = null;
var obj = null;

if (argv.file) {
  obj = yaml.load(fs.readFileSync(argv.file, {encoding: 'utf-8'}));

  emptyDTO = {};
  dtoInterface = [];
  if (obj.fields) {
    fields = obj.fields;
    for (let field of obj.fields) {
      emptyDTO[field.name] = null;
      dtoInterface.push(`${field.name}: ${field.type} | null`);
    }

    dtoInterface = dtoInterface.join(';');
  }
}

const sourceModuleName = 'Book';
const targetModule =
  argv.name[0].toUpperCase() + argv.name.substr(1, argv.name.length - 1);
const targetModuleFolder = argv.name.toLowerCase() + 's';

const name = targetModule + 's';

const srcDir = './modules/books';
const destDir = './modules/' + targetModuleFolder;

console.log('will create module:', name);

if (fs.existsSync(destDir)) {
  console.log('Directory', name, 'exists in modules folder', destDir);
  process.exit();
}

fs.copySync(srcDir, destDir, {overwrite: true | false});

fs.readdirSync(destDir).forEach(file => {
  const targetFile = `${destDir}/${file.replace(
    sourceModuleName,
    targetModule,
  )}`;

  fs.renameSync(`${destDir}/${file}`, targetFile);

  const data = fs.readFileSync(targetFile, 'utf8');
  var result = data.replace(
    new RegExp(sourceModuleName, 'g'),
    `${targetModule}`,
  );
  fs.writeFileSync(targetFile, result, 'utf8');
});

// Update the DTO

if (fields) {
  const dtoPath = `${destDir}/${targetModule}EditForm.tsx`;
  let data = fs.readFileSync(dtoPath, 'utf8');
  let writeEntities = getFieldsEntityBody(data, fields);
  fs.writeFileSync(dtoPath, writeEntities, 'utf8');
}

if (fields) {
  const dtoPath = `${destDir}/${targetModule}SingleScreen.tsx`;

  const data = fs.readFileSync(dtoPath, 'utf8');

  let body = [];

  for (const field of fields) {
    body.push(
      `<RowValue label={'${field.label}'} value={data?.${field.name}} />`,
    );
  }

  var result = data.replaceAll(/(<RowValue(.|\n)*?\/>)/g, '@');
  result = result.replaceAll(
    /(<Card>)(.|\n)*(<\/Card>)/g,
    '$1' + body.join('') + '$3',
  );

  fs.writeFileSync(dtoPath, result, 'utf8');
}

if (fields) {
  const dtoPath = `${destDir}/${targetModule}ListItem.tsx`;

  const data = fs.readFileSync(dtoPath, 'utf8');

  let body = [];

  for (const field of fields) {
    body.push(
      `<RowValue label={'${field.label}'} value={item?.${field.name}} />`,
    );
  }

  var result = data.replaceAll(/(<RowValue(.|\n)*?\/>)/g, '----content');
  result = result.replace('----content', body.join('\n'));
  result = result.replaceAll('----content', '');

  fs.writeFileSync(dtoPath, result, 'utf8');
}

if (obj.fields) {
  const dtoPath = `${destDir}/${targetModule}EntityValidator.tsx`;

  let body = [];

  for (const field of fields) {
    if (!field.validators) {
      continue;
    }

    body.push(
      `${field.name}: Yup.${field.type}().required(t.formValidation.fieldNeccessary)`,
    );
  }

  const data = fs.readFileSync(dtoPath, 'utf8');
  var result = data.replaceAll(
    /(\/\/ @meta\(entityvalidator\))((.|\n)*\({(.|\n)*}\),)/g,
    `Yup.object({${body.join(',')}})`,
  );

  fs.writeFileSync(dtoPath, result, 'utf8');
}

// For the filtering at this moment we do not impose any default validations
if (obj.fields) {
  const dtoPath = `${destDir}/${targetModule}FilterValidator.tsx`;

  const data = fs.readFileSync(dtoPath, 'utf8');
  var result = data.replaceAll(
    /(\/\/ @meta\(entityvalidator\))((.|\n)*\.shape\(\{)(.|\n)*}\),/g,
    `$2`,
  );

  fs.writeFileSync(dtoPath, result, 'utf8');
}

if (emptyDTO) {
  const dtoPath = `${destDir}/${targetModule}Dto.ts`;

  const data = fs.readFileSync(dtoPath, 'utf8');
  var result = data.replace(
    new RegExp('(Empty: DTO = ){((.|\n)*)};', 'g'),
    `$1${JSON.stringify(emptyDTO, null, 2)}`,
  );

  result = result.replaceAll(
    /\/\/ @meta\(primaryKey\)\n.*;/g,
    `return \`$\{item.${obj.primaryKey}\}\``,
  );

  result = result.replace(
    new RegExp('(interface DTO ){((.|\n)*?)}', 'g'),
    `$1{${dtoInterface}}`,
  );
  fs.writeFileSync(dtoPath, result, 'utf8');
}

if (obj.mockSource) {
  const dtoPath = `${destDir}/${targetModule}InteractionPool.ts`;

  const data = fs.readFileSync(dtoPath, 'utf8');
  var result = data.replace(
    '../../assets/mock-data/books.json',
    obj.mockSource,
  );

  let newFilters = [];

  for (const field of obj.fields) {
    newFilters.push(
      `if (inlineFiltering.${field.type.toUpperCase()}(params, item, '${
        field.name
      }')) continue;`,
    );
  }

  result = result.replace(
    /\/\/ @meta(.|\n)*\/\/ @meta\(end\)/,
    newFilters.join('\n'),
  );
  fs.writeFileSync(dtoPath, result, 'utf8');
}

var data2 = fs.readFileSync('./stacks/Screens.tsx', 'utf8');
var result = data2.replace(
  new RegExp('// DO_NOT_DELETE_LINE ScreenAppendAutomatic', 'g'),
  `${name}List = '${name}List',
  ${targetModule}Single = '${targetModule}Single',
  ${targetModule}Form = '${targetModule}Form',
\n  // DO_NOT_DELETE_LINE ScreenAppendAutomatic`,
);
fs.writeFileSync('./stacks/Screens.tsx', result, 'utf8');

var data2 = fs.readFileSync('./stacks/AppStack.tsx', 'utf8');
var result = data2.replace(
  '{/*DO_NOT_DELETE_LINE:Screen*/}',
  `<Drawer.Screen name={Screens.${name}List} component={${name}ListScreen} />
    <Drawer.Screen   options={{
      drawerItemStyle: {display: 'none'},
    }} name={Screens.${targetModule}Single} component={${targetModule}SingleScreen} />
    <Drawer.Screen   options={{
      drawerItemStyle: {display: 'none'},
    }} name={Screens.${targetModule}Form} component={${targetModule}FormScreen} />
      {/*DO_NOT_DELETE_LINE:Screen*/}`,
);
result = result.replace(
  '// DO_NOT_DELETE_LINE:Import',
  `import {${name}ListScreen} from '~/modules/${targetModuleFolder}/${name}ListScreen';
import {${targetModule}SingleScreen} from '~/modules/${targetModuleFolder}/${targetModule}SingleScreen';
import {${targetModule}FormScreen} from '~/modules/${targetModuleFolder}/${targetModule}FormScreen';
  
  \n// DO_NOT_DELETE_LINE:Import`,
);
fs.writeFileSync('./stacks/AppStack.tsx', result, 'utf8');

var exec = require('child_process').execSync;

exec(`prettier --write "${destDir}/**/*.*"`);
exec(`prettier --write "stacks/*.*"`);
