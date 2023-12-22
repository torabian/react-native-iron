var fs = require('fs-extra');

function getFieldsEntityBody(data, fields) {
  const cleanFormReg = new RegExp('(({.*})\n.*)?<Form.((.|\n)*)? />', 'g');

  const matches = data.matchAll(
    /({\/\* \@meta\((.*)\) \*\/})(\n.*)(<Form.(.|\n)*?\/>)/g,
  );

  const fieldsLibrary = {};

  for (const match of matches) {
    const [total, c, metaData, d, body] = match;

    const metas = {};
    metaData.split(',').forEach(t => {
      const [key, value] = t.split(':');
      metas[key] = value;
    });

    fieldsLibrary[metas.as] = {body, metas};
  }

  let body = [];
  for (const field of fields) {
    const el = fieldsLibrary[field.type];
    let formItem = el.body;

    formItem = formItem
      .replaceAll(el.metas.name, field.name)
      .replaceAll(el.metas.label, field.label);
    body.push(formItem);
  }

  body = body.join('\n');

  data = data.replaceAll(cleanFormReg, body);

  return data;
}

module.exports = {getFieldsEntityBody};
