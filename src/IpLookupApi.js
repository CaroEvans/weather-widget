const IpLookupApi = {

  // TO DO: test these methods

  async findLocationData() {
    const response = await fetch('https://extreme-ip-lookup.com/json/')
    return await response.json()
  }
}

export default IpLookupApi