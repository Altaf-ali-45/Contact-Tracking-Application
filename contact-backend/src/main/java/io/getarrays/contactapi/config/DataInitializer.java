package io.getarrays.contactapi.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.getarrays.contactapi.domain.Contact;
import io.getarrays.contactapi.domain.User;
import io.getarrays.contactapi.repo.ContactRepo;
import io.getarrays.contactapi.repo.UserRepo;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepo userRepo;
    private final ContactRepo contactRepo;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedDemoData() {
        return args -> {
            User testUser = userRepo.findByUsername("test")
                    .orElseGet(() -> {
                        User user = new User();
                        user.setUsername("test");
                        user.setPassword(passwordEncoder.encode("test123"));
                        user.setRole("USER");
                        return userRepo.save(user);
                    });

            List<Contact> contactsToSeed = List.of(
                    buildContact(testUser, "Alice Johnson", "alice.johnson@example.com", "+1 555-0101", "Product Manager", "12 Lakeview Ave, Austin", "ACTIVE"),
                    buildContact(testUser, "Brian Smith", "brian.smith@example.com", "+1 555-0102", "Software Engineer", "45 Pine Street, Seattle", "ACTIVE"),
                    buildContact(testUser, "Carla Mendes", "carla.mendes@example.com", "+1 555-0103", "HR Specialist", "89 River Road, Denver", "INACTIVE")
            );

            contactsToSeed.stream()
                    .filter(contact -> !contactRepo.existsByUserAndEmail(testUser, contact.getEmail()))
                    .forEach(contactRepo::save);
        };
    }

    private Contact buildContact(User user, String name, String email, String phone, String title, String address, String status) {
        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmail(email);
        contact.setPhone(phone);
        contact.setTitle(title);
        contact.setAddress(address);
        contact.setStatus(status);
        contact.setPhotoUrl("");
        contact.setUser(user);
        return contact;
    }
}
