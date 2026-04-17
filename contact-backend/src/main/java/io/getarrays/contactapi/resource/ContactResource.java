package io.getarrays.contactapi.resource;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.getarrays.contactapi.domain.Contact;
import io.getarrays.contactapi.domain.User;
import io.getarrays.contactapi.dto.ContactResponse;
import io.getarrays.contactapi.service.IContactService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
public class ContactResource {

    private final IContactService contactService;

    // CREATE
    @PostMapping
    public ResponseEntity<Contact> createContact(
            @RequestBody Contact contact,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                contactService.createContact(contact, user)
        );
    }

    // READ ONE (EDIT LOAD)
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                contactService.getContact(id, user)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable UUID id,
            @RequestBody Contact contact,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(
                contactService.updateContact(id, contact, user)
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user
    ) {
        contactService.deleteContact(id, user);
        return ResponseEntity.noContent().build();
    }


    // LIST
    @GetMapping
    public ResponseEntity<Page<ContactResponse>> getContacts(
            @AuthenticationPrincipal User user,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                contactService.getContacts(user, pageable)
        );
    }
}
