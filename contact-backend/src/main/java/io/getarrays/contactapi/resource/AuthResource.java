package io.getarrays.contactapi.resource;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.getarrays.contactapi.domain.User;
import io.getarrays.contactapi.repo.UserRepo;
import io.getarrays.contactapi.security.JwtUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthResource {

    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User request) {

        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("token", token);
    }
    
    
    @PostMapping("/register")
    public User register(@RequestBody User request) {

        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        request.setPassword(passwordEncoder.encode(request.getPassword()));
        request.setRole("USER");

        return userRepo.save(request);
    }
    
}

