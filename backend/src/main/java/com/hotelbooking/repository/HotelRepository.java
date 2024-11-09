package com.hotelbooking.repository;

import com.hotelbooking.model.Hotel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    Optional<Hotel> findByHotelCode(Long hotelCode);  // Use "findByHotelCode" for consistency
}
