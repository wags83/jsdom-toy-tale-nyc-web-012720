class APIAdapter {
  constructor(baseURL){
    this.baseURL = baseURL
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     }
    }


  async getAll(endpoint){
    const response = await fetch(`${this.baseURL}${endpoint}`)
    const result = await response.json()
    return result
  }

  async post(endpoint, body){
    console.log(body)
    let response = await fetch(`${this.baseURL}${endpoint}`,
      {
        method: "POST",
        headers: this.headers,
        body
      })
    return response.json()
  }



}