package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@SpringBootApplication
@RestController
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @RequestMapping(value = "/")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok()
                .body("{\"status\": 200, \"msg\": \"Connected rest api successfully.\"}");
    }
}
