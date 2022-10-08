let url = 'http://localhost'

export async function sendRequest(method, endpoint, body, nocors) {
    let response = await fetch( url + '/waveshare-server-php/api/' + endpoint + '.php', {
        method: method,
        body: JSON.stringify(body),
        mode: nocors ? 'no-cors' : 'cors'
    });
    return response;
}