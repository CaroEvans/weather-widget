const IpLookupApi = {

  // TO DO: test these methods

  findLocationData() {
    return fetch('https://extreme-ip-lookup.com/json/')
    .then( response => response.json())
  }
}

export default IpLookupApi