const accessToken = {
    token: '',
    setToken(newToken: string) {
        this.token = newToken;
    },
    getToken() {
        return this.token;
    },
};

export { accessToken };