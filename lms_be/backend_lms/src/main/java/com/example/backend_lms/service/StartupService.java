//package com.example.backend_lms.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.event.ContextRefreshedEvent;
//import org.springframework.context.event.EventListener;
//import org.springframework.stereotype.Component;
//
//import java.io.File;
//
//@Component
//public class StartupService {
//    @Value("${upload.folder}")
//    private String Upload_Folder;
//
//    @EventListener(ContextRefreshedEvent.class)
//    public void contextRefreshedEvent() {
//        if (!new File(Upload_Folder).exists()) {
//            new File(Upload_Folder).mkdirs();
//        }
//    }
//}
