package com.ts.tsProject.dto;

import com.ts.tsProject.enums.TimeSheetStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeSheetDTO {
    //here
    private Integer id;

    private String createdBy;

    private LocalDate fromDate;

    private LocalDate toDate;

    @NotNull
    private TimeSheetStatus status;

    @Size(max = 45, message = "Note should contain max 45 chars")
    @NotNull
    private String note;

    private Integer userId;
    //26
    private LocalDate modifiedAt;
    private String modifiedBy;


}

