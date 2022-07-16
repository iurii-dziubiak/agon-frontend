export let dataHandler = {
    getGames: () => {
        return apiGet("http://localhost:8088/api/games");
    }
};

function apiGet(url) {
    const result = [];
    fetch(url, {
        method: "GET",
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on API server!');
            }
        })
        .then(data => {
            for (const value of data) {
                result.push(value);
            }
        });
    return result;
}

// async function apiPost(url, payload) {
//     let response = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(payload),
//         headers: {'Content-Type': 'application/json'}
//     });
//     if (response.status === 200) {
//         return response.json();
//     }
// }
//
// async function apiDelete(url, payload) {
//     let response = await fetch(url, {
//         method: "DELETE",
//         body: JSON.stringify(payload),
//         headers: {'Content-Type': 'application/json'}
//     });
//     if (response.status === 200) {
//         return response.json();
//     }
// }
//
// async function apiPut(url, payload) {
//     let response = await fetch(url, {
//         method: "PUT",
//         body: JSON.stringify(payload),
//         headers: {'Content-Type': 'application/json'}
//     });
//     if (response.status === 200) {
//         return response.json();
//     }
// }