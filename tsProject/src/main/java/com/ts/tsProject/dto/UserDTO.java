package com.ts.tsProject.dto;

import com.ts.tsProject.enums.UserType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @Size(max = 45, message = "First name should contain max 45 chars")
    @NotNull
    private String firstName;

    @Size(max = 45, message = "Last name should contain max 45 chars")
    @NotNull
    private String lastName;

    @Size(max = 45, message = "Username should contain max 45 chars")
    @NotNull
    private String userName;

    @Size(max = 45, message = "Password should contain max 45 chars")
    @NotNull
    private String password;

    @NotNull
    private UserType role;

    @Min(value = 0)
    @Max(value = 20)
    private int daysOff;

    @FutureOrPresent
    private LocalDate createdAt;


    ///feb 21

    private String createdBy;
    private String modifiedBy;



}
