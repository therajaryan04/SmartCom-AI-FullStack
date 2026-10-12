
package com.smartcommerce.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierResponse {

    private Long id;

    private String companyName;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    private String gstNumber;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}