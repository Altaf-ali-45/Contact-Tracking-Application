package io.getarrays.contactapi.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContactResponse {
	private UUID id;
    private String name;
    private String email;
    private String phone;
    private String title;
    private String address;
    private String status;
    private String photoUrl;
}
