function fetchPlants() {
  return fetch(`http://www.harvesthelper.herokuapp.com/api/v1/plants?api_key=${api-key}`)
      .then(response => response.json());
}
