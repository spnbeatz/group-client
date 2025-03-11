export const register = async (userData: any) => {
    console.log("register attempt")
    const result = await fetch("http://localhost:5037/api/user/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ustalamy, że wysyłamy JSON
        },
        body: JSON.stringify(userData) // Zamiana danych na JSON
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

export const login = async (credentials: { Email: string; Password: string }) => {
  console.log(credentials, "credentials");

  try {
      const response = await fetch('http://localhost:5037/api/auth/login', {
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
    console.log(token, " getUserDataToken");
    if(!token) return;
    const response = await fetch('http://localhost:5037/api/user/get', {
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
    const response = await fetch('http://localhost:5037/api/user/all', {
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
 