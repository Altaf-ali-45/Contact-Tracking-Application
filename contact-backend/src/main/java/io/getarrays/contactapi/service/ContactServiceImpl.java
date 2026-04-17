package io.getarrays.contactapi.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.getarrays.contactapi.domain.Contact;
import io.getarrays.contactapi.domain.User;
import io.getarrays.contactapi.dto.ContactResponse;
import io.getarrays.contactapi.repo.ContactRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ContactServiceImpl implements IContactService {

    private final ContactRepo contactRepo;

    @Override
    public Page<ContactResponse> getContacts(User user, Pageable pageable) {
        return contactRepo
                .findByUser(user, pageable)
                .map(this::mapToDto);
    }

    @Override
    public Contact createContact(Contact contact, User user) {
        contact.setUser(user);
        return contactRepo.save(contact);
    }

    @Override
    public Contact getContact(UUID id, User user) {
        return contactRepo
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Contact not found or access denied")
                );
    }

    @Override
    public Contact updateContact(UUID id, Contact updated, User user) {

        Contact existing = contactRepo
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Contact not found or access denied")
                );

        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setTitle(updated.getTitle());
        existing.setAddress(updated.getAddress());
        existing.setStatus(updated.getStatus());

        return contactRepo.save(existing);
    }

    @Override
    public void deleteContact(UUID id) {
        contactRepo.deleteById(id);
    }
    
    @Override
    public void deleteContact(UUID id, User user) {

        Contact contact = contactRepo
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Contact not found or access denied")
                );

        contactRepo.delete(contact);
    }


    private ContactResponse mapToDto(Contact c) {
        return new ContactResponse(
                c.getId(),
                c.getName(),
                c.getEmail(),
                c.getPhone(),
                c.getTitle(),
                c.getAddress(),
                c.getStatus(),
                c.getPhotoUrl()
        );
    }
}
