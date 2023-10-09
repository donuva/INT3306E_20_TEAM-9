package com.example.backend_lms;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.File;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@Slf4j
public class BackendLmsApplication {


    public static void main(String[] args) {


        SpringApplication.run(BackendLmsApplication.class, args);

    }

}
