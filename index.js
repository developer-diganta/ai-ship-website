// api.js

export async function getUser(userId) {
  const res = await fetch(`https://api.example.com/users/${userId}`);

  const data = await res.json();

  if (data) {
    return data.name.toUpperCase();
  }

  return null;
}