package com.pixly.shortnersb.controller;

import com.pixly.shortnersb.dto.ClickEventDto;
import com.pixly.shortnersb.dto.UrlMappingDto;
import com.pixly.shortnersb.models.UrlMapping;
import com.pixly.shortnersb.models.User;
import com.pixly.shortnersb.service.UrlMappingService;
import com.pixly.shortnersb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
public class UrlMappingController {
    @Autowired
    private UrlMappingService urlMappingService;

    @Autowired
    private UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createShortUrl(@RequestBody Map<String, String> urlMap , Principal principal){
        String originalUrl = urlMap.get("original_url");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDto urlMappingDto = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDto);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAllUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDto> lst = urlMappingService.getAllUrls(user);
        return ResponseEntity.ok(lst);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getAnalyticsOfUrl(@PathVariable String shortUrl, @RequestParam String startDate, @RequestParam String endDate){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        //2011-12-03T10:15:30
        LocalDateTime start = LocalDateTime.parse(startDate,dateTimeFormatter);
        LocalDateTime end = LocalDateTime.parse(endDate,dateTimeFormatter);

        List<ClickEventDto> lst = urlMappingService.getClickEventsByDate(shortUrl,start,end);
        return ResponseEntity.ok(lst);
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate,Long>> getTotalClicks(Principal principal, @RequestParam String startDate, @RequestParam String endDate){
        User user = userService.findByUsername(principal.getName());

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
        //2011-12-03T10:15:30
        LocalDate start = LocalDate.parse(startDate,dateTimeFormatter);
        LocalDate end = LocalDate.parse(endDate,dateTimeFormatter);

        Map<LocalDate,Long> mp = urlMappingService.getTotalClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(mp);
    }
}
