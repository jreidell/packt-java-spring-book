package com.packt.cardatabase.service;

import java.security.Key;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService {
    // 86400000 = 1 day in ms. Should be shorter in prod
    static final long EXPIRATIONTIME = 86400000;
    static final String PREFIX = "Bearer";

    // Generate secret key. Only for demonstration purposes.
    // In Production, you should read it form the application configuration
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // generate a signed JWT
    public String getToken(String username) {
        String token = Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
            .signWith(key)
            .compact();
        
        return token;
    }

    // Get a token from request Authorization header,
    // verify the token and get the username
    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null) {
            String user = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token.replace(PREFIX, ""))
                .getBody()
                .getSubject();
            
            if(user != null) {
                return user;
            }
        }

        return null;
    }

}
