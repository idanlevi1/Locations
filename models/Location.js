export default class Location {
    name = '';
    address = '';
    coordinates = {latitude: 0, longitude: 0};
    category = '';
  
    constructor(name, address, coordinates, category) {
      this.name = name;
      this.address = address;
      this.coordinates = coordinates;
      this.category = category;
    }
  }
  