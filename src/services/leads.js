const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT_HOOK;

export default function leads(data = {}) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
