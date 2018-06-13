import * as React from 'react';
import {Component} from 'react';

export interface IRenderArgs<T, K> {
  input: T;
  output: (v: K) => any;
}

interface PureProps<T, K> {
  input: T;
  output: (v: K) => any;
  render: (args: IRenderArgs<T, K>) => React.ReactNode;
}

interface TargetProps<K> {
  output: (v: K) => any;
  value: K;
}

export interface ComponentProps<T, K> {
  initial: T;
  render: (args: IRenderArgs<T, K>) => React.ReactNode;
  children: (value: K) => React.ReactNode;
  onChange?: (newValue: K) => any;
}

export interface ComponentState<K> {
  value?: K,
  hasValue: boolean;
}

class Target<K> extends React.PureComponent<TargetProps<K>> {

  componentDidMount() {
    this.props.output(this.props.value);
  }

  componentDidUpdate() {
    this.props.output(this.props.value);
  }

  render(): null {
    return null;
  }
}

class Channel<T, K> extends React.PureComponent<PureProps<T, K>> {
  render() {
    const {render, input, output} = this.props;
    return render({input, output: value => <Target value={value} output={output}/>});
  }
}

export class SideChannel<T, K> extends Component<ComponentProps<T, K>, ComponentState<K>> {
  state = {
    value: undefined as K,
    hasValue: false
  };

  setValue = (value: K): null => {
    this.setState({value, hasValue: true});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    return null;
  };

  render() {
    const {value, hasValue} = this.state;
    const {initial, render, children} = this.props;
    return (
      <React.Fragment>
        <Channel input={initial} render={render} output={this.setValue}/>
        {hasValue && children(value as any)}
      </React.Fragment>
    );
  }
}