const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export type Method = 
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export const networkRequest = async (
  url = '',
  {
    method = 'GET',
    body = {},
    headers = {},
  }: { method?: Method; body?: unknown; headers?: Record<string, string> }
) => {
  const urlString = `${baseURL}${url}`;
  headers["Content-Type"] = "application/json"

  try {
    const response = await fetch(urlString, {method, body: method.toUpperCase() === 'GET' ? undefined : JSON.stringify(body) as BodyInit, headers});
    if (!response.ok) {
      const error = response
      console.log('error: ', error);
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Network request error:', error);
    return error;
  }
};
