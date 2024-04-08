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
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function saveSecret(id, secret) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SITE_URL}/api/v1/client/secret`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id, secret }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { status, message } = await res.json();
    return { status, message };
  } catch (err) {
    console.log(err);
  }
}

export async function saveImagePath(data) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SITE_URL}/api/v1/client/image-path`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
