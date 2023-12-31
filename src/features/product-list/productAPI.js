export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/api/products')
    const data = await response.json()

    resolve({ data })
  }
  );
}
export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/api/products/'+id)
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchProductsByFilters({ filter, sort, pagination }) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  let queryString = '';

  //   filter.map(item => {
  //     for(let key in item){
  //         queryString += `${key}=${item[key]}&`
  //     } 
  // })
  if(filter) {
    // console.log("Hii from FilterApi")
    for (let key in filter) {
      filter[key].map((e) => {
        queryString += `${key}=${e}&`
      })
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  // console.log(queryString)
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/api/products?' + queryString)
    const data = await response.json()
    const totalItems = await response.headers.get("X-Total-Count")
    resolve({ data: { products: data, totalItems: totalItems } })
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/categories')
    const data = await response.json()
    resolve({ data })
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/api/categories')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function createProducts(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/api/products", {
      method  : "POST",
      body : JSON.stringify(product),
      headers : {"content-type" : "application/json"}
    })
    const data = await response.json() 
    resolve({data})
  }
  );
}
export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/api/products/"+ update.id, {
      method  : "PATCH",
      body : JSON.stringify(update),
      headers : {"content-type" : "application/json"}
    })
    const data = await response.json() 
    resolve({data})
  }
  );
}
