import { SITE_URL } from './variables';

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

export async function saveImagePath(id, frontID, backID, selfieID) {
  console.log(id, frontID, backID, selfieID);
  try {
    const res = await fetch(`${SITE_URL}/api/v1/client/image-path`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        frontID,
        backID,
        selfieID,
      }),
    });
    const { status } = await res.json();
    return status;
  } catch (err) {
    console.log(err);
  }
}
