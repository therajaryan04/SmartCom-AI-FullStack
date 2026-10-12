package com.smartcommerce.backend.dto.request;

import com.smartcommerce.backend.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {

    @NotNull
    private Long orderId;

    @NotNull
    private PaymentMethod paymentMethod;
}
