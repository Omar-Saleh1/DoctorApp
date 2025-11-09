export interface Welcome {
    message: string;
    token:   string;
    user:    User;
}

export interface User {
    id:    string;
    name:  string;
    email: string;
    role:  string;
}