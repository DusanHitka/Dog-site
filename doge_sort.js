'use strict';
const sortingDirections = ['Ascending','Descending'];

class DogeSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sortingDirection: 0,
    };
  }  

  getSortDirection(sortDirectionId) {
    if (sortDirectionId > 1) {
      return sortingDirections[0];
    } else {
      return sortingDirections[sortDirectionId];
    }
  }

  functionPassed () {    
    this.setState({sortingDirection: this.props.action()});
  }
  
  render() {
    return React.createElement(
      'span',
      {},
      [ `Doges are sorted ${this.getSortDirection(this.state.sortingDirection + 1)} by name. Switch sorting to `,
        React.createElement(
          'button',
          {key: 'doge_sort_button', id: 'doge_sort_button', onClick: () => this.functionPassed()},
          this.getSortDirection(this.state.sortingDirection),
      )]
    )
  }  
}

// const domContainer = document.querySelector('#doge_sort');
// ReactDOM.render(React.createElement(DogeSort), domContainer);