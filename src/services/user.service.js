import { authUser } from '../helpers';

const login = (username, password) => {

    if(username === authUser.username && password === authUser.password) {
        localStorage.setItem('user', JSON.stringify({username}));
        return Promise.resolve({
            username
        });
    }

    return Promise.reject(
        'Username or password is incorrect'
    );
}

const logout = () => {
    localStorage.removeItem('user');
}

export const userService = {
    login,
    logout
};
