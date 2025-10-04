package com.pixly.shortnersb.service;

import com.pixly.shortnersb.dto.ClickEventDto;
import com.pixly.shortnersb.dto.UrlMappingDto;
import com.pixly.shortnersb.models.ClickEvent;
import com.pixly.shortnersb.models.UrlMapping;
import com.pixly.shortnersb.models.User;
import com.pixly.shortnersb.repository.ClickEventRepo;
import com.pixly.shortnersb.repository.UrlMappingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UrlMappingService {
    @Autowired
    private UrlMappingRepo urlMappingRepo;

    @Autowired
    private ClickEventRepo clickEventRepo;

    public UrlMappingDto createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl(originalUrl);
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setCreatedAt(LocalDateTime.now());
        urlMapping.setUser(user);

        UrlMapping savedUrlMapping = urlMappingRepo.save(urlMapping);
        return convertUrlMappingToDto(savedUrlMapping);
    }

    private UrlMappingDto convertUrlMappingToDto(UrlMapping urlMapping){
        return new UrlMappingDto(
                urlMapping.getId(),
                urlMapping.getOriginalUrl(),
                urlMapping.getShortUrl(),
                urlMapping.getClickCount(),
                urlMapping.getCreatedAt(),
                urlMapping.getUser().getUsername()
        );
    }

    private String generateShortUrl(String originalUrl) {
        String alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            stringBuilder.append(alphabets.charAt(random.nextInt(alphabets.length())));
        }
        return stringBuilder.toString();
    }

    public List<UrlMappingDto> getAllUrls(User user) {
        return urlMappingRepo.findByUser(user).stream()
                .map(this::convertUrlMappingToDto)
                .toList();

    }

    public List<ClickEventDto> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepo.findByShortUrl(shortUrl);

        if (urlMapping != null) {
            List<ClickEvent> events =
                    clickEventRepo.findByUrlMappingAndClickedAtBetween(urlMapping, start, end);

            // Group by LocalDate and count
            return events.stream()
                    .collect(Collectors.groupingBy(
                            e -> e.getClickedAt().toLocalDate(),  // group by date only
                            Collectors.counting()                 // count events per date
                    ))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDto dto = new ClickEventDto();
                        dto.setClickDate(entry.getKey());
                        dto.setCount(entry.getValue().intValue());
                        return dto;
                    })
                    .collect(Collectors.toList());
        }

        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        //Get All the Url Mappings of a User
        List<UrlMapping> urlMappings = urlMappingRepo.findByUser(user);
        if( urlMappings != null ){
            //Get All the List<ClickCount> of these Url Mappings That are between the Date Range
            List<ClickEvent> list = clickEventRepo.findByUrlMappingInAndClickedAtBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());            //start --> Us din ke Start Se  end --> end jo pass kiya hai usse ek jyada
            return list.stream()
                    .collect(Collectors.groupingBy(click -> click.getClickedAt().toLocalDate(), Collectors.counting()));
        }
        return null;
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepo.findByShortUrl(shortUrl);

        if(urlMapping != null){
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);       //Increment Logic
            urlMappingRepo.save(urlMapping);

            //Recording Click Event in DB
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setUrlMapping(urlMapping);
            clickEvent.setClickedAt(LocalDateTime.now());
            clickEventRepo.save(clickEvent);
        }

        return urlMapping;
    }
}
