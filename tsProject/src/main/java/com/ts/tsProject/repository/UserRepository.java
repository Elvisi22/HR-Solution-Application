package com.ts.tsProject.repository;

import com.ts.tsProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User , Integer> {

    User findUserByUserName(String userName);

    @Query(value = "SELECT u.* " +
            "FROM user u " +
            "JOIN ( " +
            "    SELECT user_id, MAX(created_at) AS latest_created_at " +
            "    FROM timesheet " +
            "    GROUP BY user_id " +
            ") t ON u.id = t.user_id " +
            "ORDER BY t.latest_created_at DESC", nativeQuery = true)
    List<User> findUsersOrderByLatestTimesheet();



}
