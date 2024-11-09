package com.hotelbooking.model;

public abstract class UserAuthenticator {
    public abstract boolean authenticate(String username, String password);
}
