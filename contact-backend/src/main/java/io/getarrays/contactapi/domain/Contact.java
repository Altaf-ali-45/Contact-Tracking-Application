package io.getarrays.contactapi.domain;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Junior RT
 * @version 1.0
 * @license Get Arrays, LLC (<a href="https://www.getarrays.io">Get Arrays, LLC</a>)
 * @email getarrayz@gmail.com
 * @since 11/22/2023
 */

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
@Table(name = "contacts")
public class Contact {
	@Id
	@GeneratedValue
	@UuidGenerator
	@Column(updatable = false, nullable = false)
	private UUID id;

    private String name;
    private String email;
    private String title;
    private String phone;
    private String address;
    private String status;
    private String photoUrl;
    // ✅ MUST be a FIELD (not method, not constructor)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getTitle() { return title; }
    public String getAddress() { return address; }
    public String getStatus() { return status; }
    public String getPhotoUrl() { return photoUrl; }
}
