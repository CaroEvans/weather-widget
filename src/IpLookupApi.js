const IpLookupApi = {

  findLocationData() {
    return fetch('https://extreme-ip-lookup.com/json/')
    .then( response => response.json())
  }
}

export default IpLookupApi