function fetchPlants() {
  return fetch(`http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${"api key"}`).then(response => response.json().then(json => {
    return json;
  }));
}
