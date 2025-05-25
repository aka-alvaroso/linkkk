export async function base64ToBlob(base64) {
  const response = await fetch(base64);
  return await response.blob();
}

export async function generateQrCode(link) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}qrcode/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      linkId: link.id,
    }),
  });

  return response;
}
