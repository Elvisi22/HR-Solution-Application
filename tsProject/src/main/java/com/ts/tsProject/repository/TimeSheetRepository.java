package com.ts.tsProject.repository;

import com.ts.tsProject.entity.Timesheet;
import com.ts.tsProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TimeSheetRepository extends JpaRepository<Timesheet , Integer> {


    @Query("SELECT t FROM Timesheet t WHERE t.user.id = :userId")
    List<Timesheet> findByUserId(Integer userId);


    boolean existsByUserAndFromDateBetweenOrToDateBetweenAndIdNot
            (User user, LocalDate startDate1, LocalDate endDate1, LocalDate startDate2, LocalDate endDate2 , Integer id);






}
