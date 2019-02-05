'use strict';

const dogeDownloader = new DogeDownloader();

class DogeList extends React.Component {
  constructor(props) {
    super(props);
    this.toogleSortingDirection = this.toogleSortingDirection.bind(this);
    this.state = { 
      doges: null,
      gotDoges: false,
      sortingDirection: 1,
    };
  }

  toogleSortingDirection() {
    if (!this.state.sortingDirection) {      
      this.setState({sortingDirection: 1});
    } else {
      this.setState({sortingDirection: 0});
    }
    return this.state.sortingDirection;
  }

  async setDogesImagesAndDescriptions(dogeName) {
    const breed = this.state.doges[dogeName].breedName;
    const subBreed = this.state.doges[dogeName].subBreedName;
    const dogeImage = await dogeDownloader.getDogeImage(breed, subBreed);
    const dogeDescription = await dogeDownloader.getDogeDescription();
    let {doges} = this.state;
    doges[dogeName].image = dogeImage;
    doges[dogeName].description = dogeDescription;
    this.setState({doges});
  }

  renderDogeHeader(dogeName) {
    return React.createElement(
      'h2',
      {key: `h2-${dogeName}`},
      dogeName
    );
  }

  renderDogeImage(doge, dogeName) {
    return React.createElement(
      'img',
      {alt: dogeName, src: doge.image, title: dogeName, key: `img-${dogeName}`, height: '100px'}
    );
  }

  renderDogeDescription(doge, dogeName) {
    return React.createElement(
      'p',
      {key: `p-${dogeName}`},
      doge.description
    );
  }

  renderDoge(doge, dogeName) {  
    let dogeElements = [this.renderDogeHeader(dogeName)];
    if (doge.image !== null) {
      dogeElements.push(this.renderDogeImage(doge, dogeName));
    }
    if (doge.description !== null) {
      dogeElements.push(this.renderDogeDescription(doge, dogeName));
    }
    return React.createElement(
      'div',
      {key: dogeName},
      dogeElements
    )
  }

  async componentDidMount() {
    const doges = await dogeDownloader.getDoges();
    this.setState({
      doges: doges,
      gotDoges: true,
    });
    for (const dogeName in this.state.doges) {   
      this.setDogesImagesAndDescriptions(dogeName);      
    };
    ReactDOM.render(React.createElement(DogeSort, {action: this.toogleSortingDirection}), document.querySelector('#doge_sort'));
  }
  
  render() {  
    if (this.state.gotDoges) {
      if (this.state.doges !== null && this.state.doges !== undefined) {   
        let result = [];
        for (const dogeName in this.state.doges) {   
          result.push(this.renderDoge(this.state.doges[dogeName], dogeName));
        };
        if (this.state.sortingDirection) {
          return result;
        } else {
          return result.reverse();
        }        
      }
      else {
        return React.createElement(
          'h2',
          {},
          'Dogs got lost :('
        );
      }
    } else {
      return React.createElement(
        'h2',
        {},
        'Getting dogs...'
      );
    }      
  }
}  

ReactDOM.render(React.createElement(DogeList), document.querySelector('#doge_list'));