package com.example.Aakar.controller;

import com.example.Aakar.model.Enquiry;
import com.example.Aakar.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    @PostMapping("/submit")
    public Enquiry submitEnquiry(@RequestBody Enquiry enquiry) {
        return enquiryService.saveEnquiry(enquiry);
    }
}
