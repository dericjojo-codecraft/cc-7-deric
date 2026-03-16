// should do a GET from : https://jsonplaceholder.typicode.com/users
// this function should introduce an additional delay of 2 secs (by default) before it can return the result as a promise.

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: number,
        lng: number
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
  }

const link = 'https://jsonplaceholder.typicode.com/users';

async function getUsers(delay:number = 2000): Promise<User[]> {
    const response = await fetch(link);
    
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json() as User[];
    return new Promise( resolve =>
        setTimeout(() => resolve(data), delay) 
    );
}

export { getUsers, link }
getUsers()
    .then(users => console.log(users))
    .catch(err => console.error(err));