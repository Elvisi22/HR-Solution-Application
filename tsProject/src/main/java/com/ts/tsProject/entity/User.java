package com.ts.tsProject.entity;

import com.ts.tsProject.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class User extends BaseClassEntity{

    @Size(max = 45 ,message = "First name should contain max 45 chars")
    @NotNull
    private String firstName;

    @Size(max = 45 ,message = "Last name should contain max 45 chars")
    @NotNull
    private String lastName;

    @Size(max = 45 ,message = "Username should contain max 45 chars")
    @NotNull
    @Column(unique = true)
    private String userName;

    @Size(max = 45 ,message = "Password should contain max 45 chars")
    @NotNull
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserType role;

    @Min(value = 0)
    @Max(value = 20)
    private int daysOff;

    @OneToMany(fetch = FetchType.LAZY , orphanRemoval = true)
    private List<Timesheet> timesheet;
    public User(String firstName, String lastName, String userName, String password, UserType role, int daysOff , String createdBy) {
        super(builder().createdAt(LocalDate.now())
                .createdBy(createdBy));
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.daysOff = daysOff;
    }

}
