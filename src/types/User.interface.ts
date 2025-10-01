export interface LoginState {
    isLogin: boolean;
    user: User | null;
}

export interface User {
    name: string;
    surn: string;
    code: string;
    fullname: string;
    Dept: string;
    Sect: string;
    position: string;
};

export interface UserAuth {
    username: string;
    password: string;
}