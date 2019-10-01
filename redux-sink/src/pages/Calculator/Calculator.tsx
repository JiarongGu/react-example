import * as React from 'react';
import { Button } from 'antd';


export default class extends React.Component {
  public state = {
    group: {
      
    }
  }

  public render() {
    return (
      <div>
        <Button onClick={() => {
          ['test1', 'test2', 'test3'].forEach(element => {
            this.setState({ 
              group: { ...this.state.group, [element]: element }
            }, () => { console.log(element, this.state.group) });
          });
        }}>
          test
        </Button>
      </div>
    );
  }
}