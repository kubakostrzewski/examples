package com.kostrzej.springexample.rest;

import com.kostrzej.springexample.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CoachRestController {
    private Coach coach;

    @Autowired
    public CoachRestController(Coach coach) {
        this.coach = coach;
    }

    @GetMapping("/dailyWorkout")
    public String getDailyWorkout() {
        return this.coach.getDailyWorkout();
    };
}
