export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string) {
    // Get the current cookie
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));

    // If the cookie is not found, return null
    if (!cookie) {
        return null;
    }

    // Get the cookie value
    const value = cookie.split("=")[1];

    // Check if the cookie has expired
    const date = new Date();
    const expires = new Date(cookie.split("; expires=")[1]);
    if (date > expires) {
        // The cookie has expired, so delete it
        deleteCookie(name);
        return null;
    }

    // Return the cookie value
    return value;
}


export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}