const BASE_URL = 'https://68271fe3397e48c91318b0a9.mockapi.io/api/book';

export async function fetchBooks() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch books');
  return await response.json();
}

export async function addBook(book) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to add book');
  return await response.json();
}
