const getClients = async (ip, port) => {
    try {
        const response = await fetch("http://" + (ip ? ip : "127.0.0.1") + ":" + (port ? port : "1985") + "/api/v1/clients/", {
            method: "get"
        });

        if (response.status !== 200) {
            return { status : response.status };
        }

        const data = await response.json();

        return { status: response.status, data: data };
    } catch (err) {
        if (err.response) {
            return { status: err.response.status };
        } else {
            return { status: 408 };
        }
    }
}

const api = {
    getClients
}

export default api;