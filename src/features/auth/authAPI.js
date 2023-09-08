// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/api/users/auth/signup", {
      method  : "POST",
      body : JSON.stringify(userData),
      headers : {"content-type" : "application/json"}
    })
    const data = await response.json() 
    resolve({data})
  }
  );
}
export function checkUser(userData) {
  return new Promise(async (resolve, reject) =>{
    try {
      const response = await fetch("http://localhost:8080/api/users/auth/login", {
      method  : "POST",
      body : JSON.stringify(userData),
      headers : {"content-type" : "application/json"}
    })
    if(response.ok){
      const data = await response.json() 
      console.log(data, "Login data")
      resolve({data})
    }
    else {
      const error = await response.json()
      console.log(error, "err auth api")
      reject(error)
    }
    } catch (error) {
      console.log(error, "error authapi")
      reject(error)
    }
  }
  );
}


export function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/api/users/" + update.id, {
      method  : "PATCH",
      body : JSON.stringify(update),
      headers : {"content-type" : "application/json"}
    })
    const data = await response.json() 
    resolve({data})
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) =>{
    // TODO : on server we will remove user session info
    resolve({data : "success"})
  }
  );
}
