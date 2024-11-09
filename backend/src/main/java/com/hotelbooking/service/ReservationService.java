package com.hotelbooking.service;

import com.hotelbooking.model.Reservation;
import com.hotelbooking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getReservationsByHotelCode(Long hotelCode) {
        return reservationRepository.findByHotelCode(hotelCode);
    }

    public Reservation createReservation(Long userId, Long hotelCode, String room, LocalDate checkInDate,LocalDate checkOutDate, String status) {
        Reservation reservation = new Reservation(userId, hotelCode, room, checkInDate, checkOutDate, status);
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservation(Long id, Reservation reservationDetails) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setUserId(reservationDetails.getUserId());
            reservation.setHotelCode(reservationDetails.getHotelCode());
            reservation.setRoom(reservationDetails.getRoom());
            reservation.setCheckInDate(reservationDetails.getCheckInDate());
            reservation.setCheckOutDate(reservationDetails.getCheckOutDate());
            reservation.setStatus(reservationDetails.getStatus());
            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
