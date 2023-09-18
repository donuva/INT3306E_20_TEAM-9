package com.example.backend_lms;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@Slf4j
public class BackendLmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendLmsApplication.class, args);
    }

}
