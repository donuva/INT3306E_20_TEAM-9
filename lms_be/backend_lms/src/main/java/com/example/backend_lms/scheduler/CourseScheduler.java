package com.example.backend_lms.scheduler;

import com.example.backend_lms.service.ExerciseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CourseScheduler {
    @Autowired
    ExerciseService exerciseService;
    //tu dong check thoi han lam bai, khong nop bai -> 0 diem
    @Scheduled(cron = "0 0 0 * * *")
    public void checkSubmit(){
        exerciseService.checkSubmit();
    }
}
