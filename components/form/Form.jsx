import React from 'react';
import classNames from 'classnames';

export default class Form extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-form',
    onSubmit(e) {
      e.preventDefault();
    },
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    horizontal: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    form: React.PropTypes.object,
    children: React.PropTypes.any,
    onSubmit: React.PropTypes.func,
  }

  static childContextTypes = {
    form: React.PropTypes.object,
  }

  getChildContext() {
    return {
      form: this.props.form,
    };
  }


  ///////////扩展定义，格式化表单的值
  getFormatFieldsValue(names) {
  const fields = names || this.getValidFieldsName();
    const allValues = {};
    fields.forEach((f) => {
      allValues[f] = this.getFormatValue(f);
    });
    return allValues;
  }
  
  getFormatValue(name) {
	const fieldMeta = this.getFieldMeta(name), field = this.getField(name);
	if (field && 'value' in field) {
		var formatter = (fieldMeta && fieldMeta.formatter);
		return formatter ? formatter(field.value) : field.value
	}
	return fieldMeta && fieldMeta.initialValue;
  }
  //////////////////////////////

  render() {
    const { prefixCls, className, style } = this.props;
    const formClassName = classNames({
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
      [className]: !!className,
    });

    return (
      <form {...this.props} className={formClassName} style={style}>
        {this.props.children}
      </form>
    );
  }
}
