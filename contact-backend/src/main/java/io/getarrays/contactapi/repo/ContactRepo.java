package io.getarrays.contactapi.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import io.getarrays.contactapi.domain.Contact;
import io.getarrays.contactapi.domain.User;
/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

public interface ContactRepo extends JpaRepository<Contact, UUID> {

    Page<Contact> findByUser(User user, Pageable pageable);

    Optional<Contact> findByIdAndUser(UUID id, User user);

    long countByUser(User user);

    boolean existsByUserAndEmail(User user, String email);
}
