React-Side-Channel 🌒
======
Render something aside, and reuse in main component tree

[![NPM version](https://img.shields.io/npm/v/react-side-channel.svg)](https://www.npmjs.com/package/react-side-channel)
 
This is more or less about keeping the react render "tree" clean

# API
 - SideChannel with following props
   - `initial` - initial value
   - `render` - something with input, and __output__.
   - `onChange` - data update callback
   - `children` - in form of renderprop, to be givven __output__.
   
The goal of the library - put aside `render`, and pipe `output` to `children`, no matter how _deep_ it is.   
```js
import {SideChannel} from 'react-side-channel';


<SideChannel
  initial={0}
  
  render={ ({input, output}) => <Value initial={input}>{output}</Value> }
>
 ({value, set}) => (
   <div>{value}</div>
 )}
</SideChannel>   
```

# Licence
 MIT