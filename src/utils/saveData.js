export default async function saveData(data, url) {
  try {
    const res = await fetch(`${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const { status, message, token } = await res.json();

    return { status, message, token };
  } catch (err) {
    console.log(err);
  }
}
