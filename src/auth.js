import Cookies from "js-cookie";
import { authed } from "./signals";

const updateAuthState = async () => {
    const token = Cookies.get('_auth');

    if (!token) {
        authed.value = false;
        return;
    }

    fetch('http://localhost:9000/validate/token', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            authed.value = false;
            return;
        }
        
        authed.value = true;
    })
}

export { updateAuthState };