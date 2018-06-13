import * as React from 'react';
import {Component} from 'react';
import {AppWrapper} from './styled';
import {SideChannel} from "../src";
import {Value} from "react-powerplug";

export interface AppState {

}


export default class App extends Component <{}, AppState> {
  state: AppState = {}

  render() {
    return (
      <AppWrapper>
        <SideChannel
          initial={0}
          render={({input, output}) => <Value initial={input} children={output}/>}
        >
          {({value, set}:any) => (
            <div>
              {value}
              <button onClick={() => set(value + 1)}>Click</button>
            </div>
          )}
        </SideChannel>
      </AppWrapper>
    )
  }
}