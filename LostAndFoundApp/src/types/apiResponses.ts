export interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
}

export interface RegisterResponse {
    _id: string;
    name: string;
    email: string;

}
