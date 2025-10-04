package com.pixly.shortnersb.repository;

import com.pixly.shortnersb.models.ClickEvent;
import com.pixly.shortnersb.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepo extends JpaRepository<ClickEvent,Long> {
    List<ClickEvent> findByUrlMappingAndClickedAtBetween(UrlMapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);
    List<ClickEvent> findByUrlMappingInAndClickedAtBetween(List<UrlMapping> urlMappingsOfUser, LocalDateTime startDate, LocalDateTime endDate);
}
