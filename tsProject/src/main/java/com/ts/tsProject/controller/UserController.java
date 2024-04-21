package com.ts.tsProject.controller;

import com.ts.tsProject.dto.UserDTO;
import com.ts.tsProject.entity.User;
import com.ts.tsProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")

public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers , HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<UserDTO>> findUser(@PathVariable(name = "id") Integer id) throws Exception{
        return  ResponseEntity.ok(userService.getUserById(id));
    }


    @PostMapping("/create")
    public ResponseEntity<Integer> createUser(@RequestBody UserDTO userDTO) throws Exception{
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id")Integer id){
        userService.deleteUser(id);
        return ResponseEntity.accepted().build();
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Integer> updateUser(@PathVariable(name = "id") Integer id , @RequestBody UserDTO userDTO)
        throws Exception{
        return new ResponseEntity<>(userService.updateUser(id, userDTO) , HttpStatus.OK);
    }


    @GetMapping("/latest-timesheets")
    public List<User> getUsersWithLatestTimesheets() {
        return userService.getUsersWithLatestTimesheets();
    }



}
