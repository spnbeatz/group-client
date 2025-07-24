export const search = async (searchQuery: string) => {
    try {
        const response = await fetch(`http://localhost:4011/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();

        if (data.results) {
            console.log('Wyniki wyszukiwania:', data.results);
            return data.results;  // Zwracamy data.results
        } else {
            console.error('Brak wyników.');
            return [];  // Zwróć pustą tablicę, jeśli brak wyników
        }
    } catch (error) {
        console.error('Błąd podczas wyszukiwania:', error);
        return [];  // Zwróć pustą tablicę w przypadku błędu
    }
};