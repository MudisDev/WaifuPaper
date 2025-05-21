import React from 'react'

export const RegexFormValidator = (text: string, typeText: string) => {


    const verifyPhone = (phone: string): boolean => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };
    const verifyEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const verifyPassword = (password: string): boolean => {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    };
    const verifyUsername = (username: string): boolean => {
        const regex = /^(?=.*[A-Z])[A-Za-z\d]{5,}$/;
        return regex.test(username);
    };
    const verifyName = (name: string): boolean => {
        const regex = /^[A-Za-zÀ-ÿÁ-Ý\s'-]{2,}$/;
        return regex.test(name);
    };

    switch (typeText) {
        case "verifyPhone":
            return verifyPhone(text);
        case "verifyEmail":
            return verifyEmail(text);
        case "verifyPassword":
            return verifyPassword(text);
        case "verifyUsername":
            return verifyUsername(text);
        case "verifyName":
            return verifyName(text);
        default:
            return false;

    }

}
