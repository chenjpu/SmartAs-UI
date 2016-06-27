import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
//import createDOMForm from 'rc-form/lib/createDOMForm';
import { mixin as formMixin } from 'rc-form/lib/createForm';
import createBaseForm from 'rc-form/lib/createBaseForm';

import assign from 'object-assign';

const mixin = {
  getForm() {
    return assign({},formMixin.getForm.call(this),{getFormatFieldsValue: this.getFormatFieldsValue});
  },

  ///////////扩展定义，格式化表单的值
  getFormatFieldsValue(names) {
	const fields = names || this.getValidFieldsName();
    const allValues = {};
    fields.forEach((f) => {
      allValues[f] = this.getFormatValue(f);
    });
    return allValues;
  },
  
  getFormatValue(name) {
	const fieldMeta = this.getFieldMeta(name), field = this.getField(name),instance = this.getFieldInstance(name);
	if (field && 'value' in field) {
		var formatter = (fieldMeta && fieldMeta.formatter) || (instance && instance.formatter);
		return formatter ? formatter(field.value) : field.value
	}
	return fieldMeta && fieldMeta.initialValue;
  }
  //////////////////////////////
};


Form.create = (o = {}) => {
  const options = assign({}, o, {
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  });

  return createBaseForm(options,[mixin]);
  //return createDOMForm(options);
};
Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
