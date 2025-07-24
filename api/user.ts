const usersEndpoint = "http://localhost:5021/users";

export const register = async (userData: any) => {
    console.log("register attempt")
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      formData.append(key, value.toString()); // Zapewnia, że wartość jest stringiem
    });
    const result = await fetch("http://localhost:5037/create", {
        method: 'POST',

        body: formData
      })
      .then( async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      })
      .then(data => {
        console.log('User created:', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    return result;
};

export const login = async (credentials: { email: string; password: string }) => {
  console.log(credentials, "credentials");
  try {
      const response = await fetch('http://localhost:4010/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Ustalamy, że wysyłamy JSON
          },
          body: JSON.stringify(credentials), // Zamiana danych na JSON
      });

      if (!response.ok) {
          // Sprawdź, czy odpowiedź serwera nie zawiera błędu (np. 401 lub 500)
          const error = await response.text();
          console.error("Error response:", error);
          throw new Error(`HTTP error! status: ${response.status} - ${error}`);
      }

      const data = await response.json();
      console.log(data, "data token");

      if (!data.token) {
          throw new Error("Token not found in the response");
      }

      return data.token; // Zwracamy tylko token
  } catch (error) {
      console.error("Error during login:", error);
      throw error; // Przekazujemy błąd dalej, jeśli jest konieczny
  }
};


export const getUserData = async (token: string | null) => {
    if(!token) return;
    const response = await fetch('http://localhost:5021/users/user', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
}

export const listUsers = async (token: string | null) => {
    if(!token) return;
    const response = await fetch(`${usersEndpoint}/api/user/all`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();

    console.log(" fetched list of users: ", data);

    return data;
}

export const getMinUserData = async (userId: string, token: string | null) => {
  try {
    const response = await fetch(`${usersEndpoint}/${userId}/basic-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.ok) {
      return await response.json();
    } else {
      console.log("Cannot fetch minimum user data");
    }
  } catch (error) {
    console.log("Server error in fetching minimum user data: ", error)
  }
}
 
export const getUser = async (id: string | string[] | undefined) => {
  try {
    const response = await fetch(`http://localhost:5037/${id}`, {
      method: 'GET'
    })

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null
  }
}