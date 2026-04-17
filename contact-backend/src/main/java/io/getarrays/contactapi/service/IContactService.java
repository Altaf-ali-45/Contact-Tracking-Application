package io.getarrays.contactapi.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import io.getarrays.contactapi.domain.Contact;
import io.getarrays.contactapi.domain.User;
import io.getarrays.contactapi.dto.ContactResponse;

public interface IContactService {

    Page<ContactResponse> getContacts(User user, Pageable pageable);

    Contact getContact(UUID id, User user);

    Contact createContact(Contact contact, User user);

    Contact updateContact(UUID id, Contact updatedContact, User user);

    void deleteContact(UUID id);
    
    void deleteContact(UUID id, User user);

}

