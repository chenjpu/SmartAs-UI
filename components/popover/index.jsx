import React from 'react';
import Tooltip from '../tooltip';
import Icon from '../icon';
import getPlacements from './placements';
import warning from 'warning';

const placements = getPlacements();

export default class Popover extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
    showClose:false,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  
  hide() {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  render() {
    return (
      <Tooltip transitionName={this.props.transitionName}
        builtinPlacements={placements}
        ref="tooltip"
        {...this.props}
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)}
        overlay={this.getOverlay()}>
        {this.props.children}
      </Tooltip>
    );
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  componentDidMount() {
    if ('overlay' in this.props) {
      warning(false, '`overlay` prop of Popover is deprecated, use `content` instead.');
    }
  }

  getOverlay() {
    // use content replace overlay
    // keep overlay for compatibility
    const { title, prefixCls, overlay, content, showClose } = this.props;

    let titleOpt = null;
    if(showClose){
      titleOpt = <div className={`${prefixCls}-title`}>{title}<div className={`${prefixCls}-close`} onClick={this.hide.bind(this)}><Icon type="cross"/></div></div>
    }else if(title){
      titleOpt = <div className={`${prefixCls}-title`}>{title}</div>
    }

    return (
      <div>
        {titleOpt}
        <div className={`${prefixCls}-inner-content`}>
          {content || overlay}
        </div>
      </div>
    );
  }
}
