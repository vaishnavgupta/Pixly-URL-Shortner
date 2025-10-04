package com.pixly.shortnersb.repository;

import com.pixly.shortnersb.models.UrlMapping;
import com.pixly.shortnersb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepo extends JpaRepository<UrlMapping,Long> {
    List<UrlMapping> findByUser(User user);
    UrlMapping findByShortUrl(String shortUrl);
}
