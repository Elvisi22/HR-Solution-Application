package com.ts.tsProject.controller;


import com.ts.tsProject.dto.TimeSheetDTO;
import com.ts.tsProject.service.TimeSheetService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/timesheet")
@AllArgsConstructor
public class TimeSheetController {

    private TimeSheetService timeSheetService;

    @DeleteMapping("/remove/{id}")
    public ResponseEntity remove(@PathVariable (name = "id")Integer id) throws Exception{
        return timeSheetService.removeTimeSheet(id);
    }

    @PostMapping("/create")
    public ResponseEntity<TimeSheetDTO> createTimeSheet(@Valid @RequestBody TimeSheetDTO timeSheetDTO) {
        try {
            TimeSheetDTO createdTimeSheet = timeSheetService.createTimeSheet(timeSheetDTO);
            return ResponseEntity.ok(createdTimeSheet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/users/{userId}")
    public ResponseEntity<List<TimeSheetDTO>> getTimesheetsByUserId(@PathVariable Integer userId) {
        List<TimeSheetDTO> timesheets = timeSheetService.getTimesheetsByUserId(userId);
        return ResponseEntity.ok(timesheets);
    }

    @PutMapping("/update/{timesheetId}")
    public ResponseEntity<TimeSheetDTO> updateTimesheetByUser(@PathVariable Integer timesheetId, @Valid @RequestBody TimeSheetDTO updatedTimeSheetDTO) {
        try {
            TimeSheetDTO updatedTimeSheet = timeSheetService.updateTimesheetByUser(timesheetId, updatedTimeSheetDTO);
            return ResponseEntity.ok(updatedTimeSheet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/updatebyManager/{timesheetId}")
    public ResponseEntity<TimeSheetDTO> updateTimesheetByManager(@PathVariable Integer timesheetId, @Valid @RequestBody TimeSheetDTO updatedTimeSheetDTO) {
        try {
            TimeSheetDTO updatedTimeSheet = timeSheetService.updateTimesheetByManager(timesheetId, updatedTimeSheetDTO);
            return ResponseEntity.ok(updatedTimeSheet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/{timesheetId}")
    public ResponseEntity<TimeSheetDTO> getTimesheetById(@PathVariable Integer timesheetId) {
        Optional<TimeSheetDTO> optionalTimeSheetDTO = timeSheetService.getTimesheetById(timesheetId);
        return optionalTimeSheetDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }








}
