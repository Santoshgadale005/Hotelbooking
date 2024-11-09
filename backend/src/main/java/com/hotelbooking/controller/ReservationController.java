package com.hotelbooking.controller;

import com.hotelbooking.model.Reservation;
import com.hotelbooking.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable Long userId) {
        return reservationService.getReservationsByUserId(userId);
    }

    @GetMapping("/hotel/{hotelCode}")
    public List<Reservation> getReservationsByHotelCode(@PathVariable Long hotelCode) {
        return reservationService.getReservationsByHotelCode(hotelCode);
    }

    @PostMapping
public Reservation createReservation(@RequestBody Reservation reservation) {
    return reservationService.createReservation(
            reservation.getUserId(),
            reservation.getHotelCode(),
            reservation.getRoom(),
            reservation.getCheckInDate(),
            reservation.getCheckOutDate(),
            reservation.getStatus()
    );
}


    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        return reservationService.updateReservation(id, reservationDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}
