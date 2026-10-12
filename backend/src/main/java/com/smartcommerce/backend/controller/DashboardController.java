package com.smartcommerce.backend.controller;

import com.smartcommerce.backend.dto.response.DashboardSummaryResponse;
import com.smartcommerce.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {

        return dashboardService.getDashboardSummary();
    }
}