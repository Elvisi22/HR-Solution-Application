package com.ts.tsProject.service;


import com.ts.tsProject.dto.UserDTO;
import com.ts.tsProject.entity.User;
import com.ts.tsProject.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;




    public List<User> getAllUsers(){
        return userRepository.findAll();
    }


    public Optional<UserDTO> getUserById(Integer id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new Exception("User does not exist");
        }

        User foundUser = user.get();

        return Optional.of(new UserDTO(
                foundUser.getFirstName(),
                foundUser.getLastName(),
                foundUser.getUserName(),
                foundUser.getPassword(),
                foundUser.getRole(),
                foundUser.getDaysOff(),
                foundUser.getCreatedAt(),
                foundUser.getCreatedBy(),
                foundUser.getModifiedBy()

        ));
    }





    public Integer createUser(UserDTO userDTO) throws Exception{
        if(userDTO.getUserName() == null || userDTO.getFirstName() == null ){
            throw new Exception("Username is empty");
        }

        User user = new User(
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getUserName(),
                userDTO.getPassword(),
                userDTO.getRole(),
                userDTO.getDaysOff(),
                userDTO.getCreatedBy()

        );
        User createdUser = userRepository.save(user);
        return  createdUser.getId();
    }


    public Integer updateUser(Integer id, UserDTO userDTO) throws Exception{

        User user = userRepository.findById(id).orElseThrow(()-> new Exception("User with id" + id +" not found"));
        user.setUserName(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPassword(userDTO.getPassword());
        user.setModifiedAt(LocalDate.now());
        user.setModifiedBy(userDTO.getModifiedBy());
        userRepository.save(user);
        return user.getId();

    }


    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }


    public List<User> getUsersWithLatestTimesheets() {
        return userRepository.findUsersOrderByLatestTimesheet();
    }












}
