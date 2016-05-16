import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import { mixin as formMixin } from 'rc-form/lib/createForm';
import createBaseForm from 'rc-form/lib/createBaseForm';


const mixin = {
  getForm() {
    return {
      ...formMixin.getForm.call(this),
      getFormatFieldsValue: this.getFormatFieldsValue,
    };
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
    const { fieldsMeta,fields} = this;
    const field = fields[name];
    const fieldMeta = fieldsMeta[name];
    if (field && 'value' in field) {
    	var formatter = (fieldMeta && fieldMeta.formatter) || field.instance.formatter;
    	return formatter ? formatter(field.value) : field.value
    }
    return fieldMeta && fieldMeta.initialValue;
  },
  //////////////////////////////
};

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  };

  return createBaseForm(options,[mixin]);
};

Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
