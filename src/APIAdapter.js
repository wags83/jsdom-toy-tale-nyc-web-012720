class APIAdapter {
  constructor(baseURL){
    this.baseURL = baseURL
    this.POSTHEADER = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
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
    {...this.POSTHEADER, body: JSON.stringify(body)}
    )
    return response.json()
  }



}