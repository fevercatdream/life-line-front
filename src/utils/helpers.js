// Regex to determine email validation

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

export function validatePassword(input) {
  const password = /^[A-Za-z]\w{7,14}$/;
  if (input.match(password)) {
    return true;
  }
  return false;
}

export const backendHost = process.env.REACT_APP_USE_LOCALHOST ? "http://localhost:3001" : "https://life-line.herokuapp.com";

export function sendJSONRequest(method, path, obj, sendAuthToken) {
    const authHeader = sendAuthToken ? {
        'Authorization': localStorage.getItem('token'),
    } : {};
    return fetch(`${backendHost}${path}`, {
        method: method,
        body: obj ? JSON.stringify(obj) : undefined,
        headers: {
            'Content-Type': 'application/json',
            ...authHeader,
        },
    });
}