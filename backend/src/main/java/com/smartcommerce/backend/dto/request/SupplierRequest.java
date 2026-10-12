package com.smartcommerce.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 100)
    private String companyName;

    @NotBlank(message = "Contact person is required")
    @Size(max = 100)
    private String contactPerson;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    private String gstNumber;
}