import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';

export default class BreadcrumbNav extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    separator: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    paths: React.PropTypes.array,
  }
  
  constructor(props) {
    super(props);
    this.state = {
    	paths: props.paths,
    };
  }

  render() {
      let crumbs;
      const { separator, prefixCls} = this.props,
      		{paths} = this.state;
      if (paths && paths.length > 0) {
        crumbs = paths.map(function(name, i) {
          return <BreadcrumbItem separator={separator} key={name}>{name}</BreadcrumbItem>;
        });
      }
      return (
        <div className={prefixCls}>
          {crumbs}
        </div>
      );
    }
}
