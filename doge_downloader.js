'use strict';

class DogeDownloader {
  constructor() {
  }

  async getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  async getDogeDescription() {
    const dogeDescription = await this.getData('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1');
    return dogeDescription[0];
  }

  async getDogeImage(breed, subBreed) {
    let url = `https://dog.ceo/api/breed/${breed}/images/random`;
    if (subBreed !== null) {
      url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
    }
    const dogeImage = await this.getData(url);
    return dogeImage.message;
  }

  async createNewDoge(breed, subBreed) {
    const newdoge = {
      breedName: breed,
      subBreedName: subBreed,
      image: null,
      description: null,
    }
    return newdoge;
  }

  getDogeName(doge){
    let dogeName = doge.breedName;
    if (doge.subBreedName !== null) {
      dogeName += ` - ${doge.subBreedName}`;
    }
    return dogeName;
  }

  async processDogeBreed(breed, subBreeds) {
    let listOfDoges = [];
    if (subBreeds.length === 0) {    
      const doge = await this.createNewDoge(breed, null);
      listOfDoges = {...listOfDoges, [this.getDogeName(doge)]: doge};
    } else {
      for(const subBreed of subBreeds) {
        const doge = await this.createNewDoge(breed, subBreed);
        listOfDoges = {...listOfDoges, [this.getDogeName(doge)]: doge};
      }
    }
    return listOfDoges;
  }

  async buildDogeList(listOfDoges) {
    if (listOfDoges.length === 0) {
      return null;
    }
    let doges = {};
    for (const breed in listOfDoges) {
      const newDoges = await this.processDogeBreed(breed, listOfDoges[breed]);
      Object.assign(doges, newDoges);
    }
    return doges;
  }

  async getDoges() {
    const doges = await this.getData('https://dog.ceo/api/breeds/list/all');
    const dogeList = await this.buildDogeList(doges.message);
    return dogeList
  }
}  