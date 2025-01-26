
function setAuthCredentials(token, userId, username) {
    sessionStorage.setItem('auth-token', token);
    sessionStorage.setItem('auth-user', username);
    sessionStorage.setItem('auth-user-id', userId);
}

function removeAuthCredentials() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-user-id');
}

function getAuthToken() {
    return sessionStorage.getItem('auth-token');
}

function getAuthUser() {
    return sessionStorage.getItem('auth-user');
}

function getAuthUserId() {
    return sessionStorage.getItem('auth-user-id');
}


function jsonToFormData(json){
    const formData = new FormData();

    const appendFormData = (data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            formData.append(parentKey, data);
        }
    };

    appendFormData(json, '');

    return formData;
};


function createHeaders() {
    const headers = {};

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    return headers;
}


async function getData(endpoint) {
    if(!endpoint){
        debugger
    }
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: createHeaders(),
        });
        const responseData = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error'
        };
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: createHeaders(),
            body: data
        });
        const responseData = await response.json();

        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };
        
    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error'
        };
    }
}

async function postDataWJSON(endpoint, data) {

    let header = createHeaders();
    header['Content-Type'] = 'application/json';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });
        
        const responseData = await response.json();
            
    console.log(responseData)
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };
        
    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error'
        };
    }
}

async function patchDataWoFiles(endpoint, data) {
    let header = createHeaders();
    header['Content-Type'] = 'application/json';
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: header,
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error'
        };
    }
}

async function patchData(endpoint, formData) {

    const headers = createHeaders();

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: headers,
            body: formData
        });

        const responseData = await response.json();
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error'
        };
    }
}

async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: createHeaders(),
        });

        let responseData = null;
        if (response.status !== 204) { 
            try {
                responseData = await response.json();
            } catch (error) {
                console.warn('Kein gültiges JSON im Response:', error);
                responseData = null;
            }
        }
        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        };

    } catch (error) {
        return {
            ok:false,
            status: 'error',
            message: 'network error',
            full_msg: error
        };
    }
}