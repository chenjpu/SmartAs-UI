import React, { PropTypes } from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
//import createDOMForm from 'rc-form/lib/createDOMForm';
import { mixin as formMixin } from 'rc-form/lib/createForm';
import createBaseForm from 'rc-form/lib/createBaseForm';

import assign from 'object-assign';
import { FIELD_META_PROP } from './constants';


function lookupNormalize(value,filedValue,nowValues){
  if(_.isString(value)){
  	return value.split(",");
  }
  if(_.isNumber(value)){
  	return [value + ""];
  }
  return value;
}

const mixin = {
  getForm() {
    return assign({},formMixin.getForm.call(this),{getFormatFieldsValue: this.getFormatFieldsValue,getLookupFieldProps:this.getLookupFieldProps});
  },

  ///////////扩展定义，格式化表单的值
  getLookupFieldProps(name, fieldOption = {}) {
  	return this.getFieldProps(name, assign({normalize:lookupNormalize},fieldOption));
  },
  
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
    fieldMetaProp: FIELD_META_PROP,
  });
  const formWrapper = createBaseForm(options,[mixin]);

  /* eslint-disable react/prefer-es6-class */
  return (Component) => formWrapper(React.createClass({
    propTypes: {
      form: PropTypes.object.isRequired,
    },
    childContextTypes: {
      form: PropTypes.object.isRequired,
    },
    getChildContext() {
      return {
        form: this.props.form,
      };
    },
    render() {
      return <Component {...this.props} />;
    },
  }));
};

Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
