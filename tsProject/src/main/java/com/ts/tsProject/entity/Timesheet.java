package com.ts.tsProject.entity;

import com.ts.tsProject.enums.TimeSheetStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Timesheet extends BaseClassEntity {



    private LocalDate fromDate;
    private LocalDate toDate;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TimeSheetStatus status;
    @Size(max = 45 ,message = "Note should contain max 45 chars")
    @NotNull
    private String note;
    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "userId")
    private User user;



}
