package com.ts.tsProject.service;

import com.ts.tsProject.dto.TimeSheetDTO;
import com.ts.tsProject.entity.Timesheet;
import com.ts.tsProject.entity.User;
import com.ts.tsProject.enums.TimeSheetStatus;
import com.ts.tsProject.repository.TimeSheetRepository;
import com.ts.tsProject.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TimeSheetService {

    private TimeSheetRepository timeSheetRepository;
    private UserService userService;
    private UserRepository userRepository;


public TimeSheetDTO createTimeSheet(TimeSheetDTO timeSheetDTO) throws Exception {
    // Retrieve user by ID
    User user = userRepository.findById(timeSheetDTO.getUserId())
            .orElseThrow(() -> new Exception("User not found"));

    // Calculate the number of days off requested
    LocalDate fromDate = timeSheetDTO.getFromDate();
    LocalDate toDate = timeSheetDTO.getToDate();

    // Validate fromDate not smaller than today's date
    if (fromDate.isBefore(LocalDate.now())) {
        throw new Exception("From date must be today or a future date");
    }

    // Validate that the dates are within the current year
    if (fromDate.getYear() != LocalDate.now().getYear() || toDate.getYear() != LocalDate.now().getYear()) {
        throw new Exception("Dates must be within the current year");
    }

    if (toDate.isBefore(fromDate)) {
        throw new Exception("To date must be after from date");
    }

    boolean overlappingTimesheets = timeSheetRepository.existsByUserAndFromDateBetweenOrToDateBetweenAndIdNot(
            user, fromDate, toDate, fromDate, toDate , timeSheetDTO.getId()
    );
    if (overlappingTimesheets) {
        throw new Exception("User has already applied for dates within the specified range");
    }

    long daysRequested = ChronoUnit.DAYS.between(fromDate, toDate) + 1; // Including both start and end dates

    // Check if the user has enough days off remaining
    int daysOffRemaining = user.getDaysOff();
    if (daysRequested > daysOffRemaining) {
        throw new Exception("Insufficient days off remaining");
    }

    // Create new TimeSheet entity
    Timesheet timeSheet = new Timesheet();
    timeSheet.setCreatedAt(LocalDate.now());
    timeSheet.setFromDate(fromDate);
    timeSheet.setToDate(toDate);
    timeSheet.setCreatedBy(timeSheetDTO.getCreatedBy());
    timeSheet.setStatus(timeSheetDTO.getStatus());
    timeSheet.setNote(timeSheetDTO.getNote());
    timeSheet.setUser(user);

    // Save the timesheet
    Timesheet savedTimeSheet = timeSheetRepository.save(timeSheet);

    // Return the DTO with the ID set
    return new TimeSheetDTO(
            savedTimeSheet.getId(),
            savedTimeSheet.getCreatedBy(),
            savedTimeSheet.getFromDate(),
            savedTimeSheet.getToDate(),
            savedTimeSheet.getStatus(),
            savedTimeSheet.getNote(),
            savedTimeSheet.getUser().getId(),
            //26
            savedTimeSheet.getModifiedAt(),
            savedTimeSheet.getModifiedBy()
    );
}



    public List<TimeSheetDTO> getTimesheetsByUserId(Integer userId) {
        List<Timesheet> timeSheets = timeSheetRepository.findByUserId(userId);
        return timeSheets.stream()
                .map(this::mapTimeSheetEntityToDTO)
                .collect(Collectors.toList());
    }

    private TimeSheetDTO mapTimeSheetEntityToDTO(Timesheet timeSheet) {
        return new TimeSheetDTO(
                timeSheet.getId(),
                timeSheet.getCreatedBy(),
                timeSheet.getFromDate(),
                timeSheet.getToDate(),
                timeSheet.getStatus(),
                timeSheet.getNote(),
                timeSheet.getUser().getId(),
                timeSheet.getModifiedAt(),
                timeSheet.getModifiedBy()
        );
    }

    public TimeSheetDTO updateTimesheetByUser(Integer timesheetId, TimeSheetDTO updatedTimeSheetDTO) throws Exception {
        Optional<Timesheet> optionalTimeSheet = timeSheetRepository.findById(timesheetId);
        if (!optionalTimeSheet.isPresent()) {
            throw new Exception("TimeSheet not found");
        }
        Timesheet timeSheet = optionalTimeSheet.get();
        timeSheet.setFromDate(updatedTimeSheetDTO.getFromDate());
        timeSheet.setToDate(updatedTimeSheetDTO.getToDate());
        timeSheet.setNote(updatedTimeSheetDTO.getNote());

        if (TimeSheetStatus.ACCEPTED.equals(updatedTimeSheetDTO.getStatus())) {
            // Retrieve user by ID
            User user = timeSheet.getUser();

            // Calculate the number of days off requested
            LocalDate fromDate = timeSheet.getFromDate();
            LocalDate toDate = timeSheet.getToDate();
            long daysRequested = ChronoUnit.DAYS.between(fromDate, toDate) + 1; // Including both start and end dates

            // Check if the user has enough days off remaining
            int daysOffRemaining = user.getDaysOff();
            if (daysRequested > daysOffRemaining) {
                throw new Exception("Insufficient days off remaining");
            }

            // Update the user's days off remaining
            user.setDaysOff(daysOffRemaining - (int) daysRequested);
            userRepository.save(user);
        }

        // Update the timesheet
        Timesheet updatedTimeSheet = timeSheetRepository.save(timeSheet);

        // Return the DTO with the ID set
        return new TimeSheetDTO(
                updatedTimeSheet.getId(),
                updatedTimeSheet.getCreatedBy(),
                updatedTimeSheet.getFromDate(),
                updatedTimeSheet.getToDate(),
                updatedTimeSheet.getStatus(),
                updatedTimeSheet.getNote(),
                updatedTimeSheet.getUser().getId(),
                //26
                updatedTimeSheet.getModifiedAt(),
                updatedTimeSheetDTO.getModifiedBy()
        );
    }

    public TimeSheetDTO updateTimesheetByManager(Integer timesheetId, TimeSheetDTO updatedTimeSheetDTO) throws Exception {
        Optional<Timesheet> optionalTimeSheet = timeSheetRepository.findById(timesheetId);
        if (!optionalTimeSheet.isPresent()) {
            throw new Exception("TimeSheet not found");
        }

        Timesheet timeSheet = optionalTimeSheet.get();
        timeSheet.setFromDate(updatedTimeSheetDTO.getFromDate());
        timeSheet.setToDate(updatedTimeSheetDTO.getToDate());
        timeSheet.setStatus(updatedTimeSheetDTO.getStatus());
        //26
        timeSheet.setNote(updatedTimeSheetDTO.getNote());
        timeSheet.setModifiedAt(LocalDate.now());
        timeSheet.setModifiedBy(updatedTimeSheetDTO.getModifiedBy());

        if (TimeSheetStatus.ACCEPTED.equals(updatedTimeSheetDTO.getStatus())) {
            // Retrieve user by ID
            User user = timeSheet.getUser();

            // Calculate the number of days off requested
            LocalDate fromDate = timeSheet.getFromDate();
            LocalDate toDate = timeSheet.getToDate();
            long daysRequested = ChronoUnit.DAYS.between(fromDate, toDate) + 1; // Including both start and end dates

            // Check if the user has enough days off remaining
            int daysOffRemaining = user.getDaysOff();
            if (daysRequested > daysOffRemaining) {
                throw new Exception("Insufficient days off remaining");
            }

            // Update the user's days off remaining
            user.setDaysOff(daysOffRemaining - (int) daysRequested);
            userRepository.save(user);
        }
        // Update the timesheet
        Timesheet updatedTimeSheet = timeSheetRepository.save(timeSheet);

        // Return the DTO with the ID set
        return new TimeSheetDTO(
                updatedTimeSheet.getId(),
                updatedTimeSheet.getCreatedBy(),
                updatedTimeSheet.getFromDate(),
                updatedTimeSheet.getToDate(),
                updatedTimeSheet.getStatus(),
                updatedTimeSheet.getNote(),
                updatedTimeSheet.getUser().getId(),
                updatedTimeSheet.getModifiedAt(),
                updatedTimeSheet.getModifiedBy()
        );
    }




    public Optional<TimeSheetDTO> getTimesheetById(Integer timesheetId) {
        Optional<Timesheet> optionalTimesheet = timeSheetRepository.findById(timesheetId);
        if (optionalTimesheet.isPresent()) {
            Timesheet timesheet = optionalTimesheet.get();
            TimeSheetDTO timeSheetDTO = new TimeSheetDTO(
                    timesheet.getId(),
                    timesheet.getCreatedBy(),
                    timesheet.getFromDate(),
                    timesheet.getToDate(),
                    timesheet.getStatus(),
                    timesheet.getNote(),
                    timesheet.getUser().getId(),
                    //26
                    timesheet.getModifiedAt(),
                    timesheet.getModifiedBy()
            );
            return Optional.of(timeSheetDTO);
        } else {
            return Optional.empty();
        }
    }



    public ResponseEntity removeTimeSheet(Integer id) throws Exception {
        Optional<Timesheet> timesheetOptional = timeSheetRepository.findById(id);
        if (timesheetOptional.isEmpty()) {
            throw new Exception("timesheet Not Found");
        }

        User user = timesheetOptional.get().getUser();
        LocalDate fromDate = timesheetOptional.get().getFromDate();
        LocalDate toDate = timesheetOptional.get().getToDate();
        long daysRequested = ChronoUnit.DAYS.between(fromDate, toDate) + 1;

        int daysOffRemaining = user.getDaysOff();

        // Update the user's days off remaining
        int totalDays = daysOffRemaining + (int) daysRequested;
        if(totalDays > 20){
            user.setDaysOff(20);
        }else {
            user.setDaysOff(daysOffRemaining + (int) daysRequested);
        }
        userRepository.save(user);

        timeSheetRepository.deleteById(id);
        return ResponseEntity.ok().body("TimeSheet is deleted");
    }

}





