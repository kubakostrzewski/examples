package com.kostrzej.springexample.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FunRestController {

    @Value("${my.name}")
    private String name;

    @Value("${my.surname}")
    private String surename;

    @GetMapping("/")
    public String sayHello() {
        return "Hello " + name + " " + surename;
    }

    @GetMapping("/workout")
    public String getDailyWorkout() {
        return  "Run hard!";
    }
}
