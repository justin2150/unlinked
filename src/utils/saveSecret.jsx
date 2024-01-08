import { SITE_URL } from './variables';

export async function saveSecret(id, secret) {
  try {
    const res = await fetch(`${SITE_URL}/api/v1/client/secret`, {
      method: 'PATCH',
      body: JSON.stringify({ id, secret }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { status, message } = await res.json();
    return { status, message };
  } catch (err) {
    console.log(err);
  }
}
