package io.getarrays.contactapi.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // MUST be at least 32 characters
    private static final String SECRET =
            "THIS_IS_A_VERY_STRONG_SECRET_KEY_32_BYTES_MIN";

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60; // 1 hour

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // =======================
    // Generate JWT
    // =======================
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )
                .signWith(key) // ✅ CORRECT
                .compact();
    }

    // =======================
    // Extract username
    // =======================
    public String extractUsername(String token) {

        return getClaims(token).getSubject();
    }

    // =======================
    // Validate token
    // =======================
    public boolean isTokenValid(String token) {

        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // =======================
    // Internal helper
    // =======================
    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key) // ✅ CORRECT
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
