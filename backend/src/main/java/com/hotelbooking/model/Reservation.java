package com.hotelbooking.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // assuming this links to the user who made the reservation
    private Long hotelCode; // references the hotel being reserved
    
    @Column(nullable = false)
    private String room; // room information as a string input

    private LocalDate checkInDate; // Changed to LocalDate
    private LocalDate checkOutDate; // Changed to LocalDate

    private String status; // e.g., "Booked", "Cancelled", etc.

    // Default constructor
    public Reservation() {}

    // Constructor to initialize fields
    public Reservation(Long userId, Long hotelCode, String room, LocalDate checkInDate, LocalDate checkOutDate, String status) {
        this.userId = userId;
        this.hotelCode = hotelCode;
        this.room = room;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getHotelCode() {
        return hotelCode;
    }

    public void setHotelCode(Long hotelCode) {
        this.hotelCode = hotelCode;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
