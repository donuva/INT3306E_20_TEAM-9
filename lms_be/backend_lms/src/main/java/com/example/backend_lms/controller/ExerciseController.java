package com.example.backend_lms.controller;

import com.example.backend_lms.dto.ExerciseDTO;
import com.example.backend_lms.dto.ScoreExerciseDTO;
import com.example.backend_lms.entity.Exercise;
import com.example.backend_lms.entity.ScoreExercise;
import com.example.backend_lms.exception.ExpiredDateException;
import com.example.backend_lms.exception.NotAllowedException;
import com.example.backend_lms.repo.ExerciseRepo;
import com.example.backend_lms.repo.ScoreExerciseRepo;
import com.example.backend_lms.service.ExerciseService;
import com.example.backend_lms.service.ScoreService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@CrossOrigin

public class ExerciseController {

    @Autowired
    ExerciseService exerciseService;

    @Autowired
    ScoreService scoreService;

    @Value("${upload.folder}")
    String Upload_Folder;

    @Autowired
    ScoreExerciseRepo scoreExerciseRepo;

    //CRUD exercise
    @PostMapping("/api/teacher/exercise/create")
    @ResponseStatus(HttpStatus.OK)
    public void createExercise(@RequestBody ExerciseDTO exerciseDTO) throws NotFoundException {
        exerciseService.create(exerciseDTO);
    }

    @GetMapping("/api/exercise/{id}")
    public ResponseEntity<ExerciseDTO> getExercise(@PathVariable("id") int id) throws NotFoundException {
        return ResponseEntity.ok(exerciseService.findById(id));
    }

    @PutMapping("/api/teacher/exercise/update")
    public ResponseEntity<ExerciseDTO> updateExercise(@RequestBody ExerciseDTO exerciseDTO) throws NotFoundException {
        return ResponseEntity.ok(exerciseService.update(exerciseDTO));
    }

    @DeleteMapping("/api/teacher/exercise/delete/{id}")
    public void deleteCourse(@PathVariable("id") int id) throws NotFoundException {
        exerciseService.delete(id);
    }

    @DeleteMapping("/api/student/exercise/delete/{work_id}")
    public void deleteWork(@PathVariable("work_id") Integer work_id) throws ExpiredDateException, NotFoundException {
        exerciseService.deleteWork(work_id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/api/student/exercise/submit")
    public void submitExercise(@ModelAttribute ScoreExerciseDTO scoreExerciseDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException, ExpiredDateException, NotFoundException {
        if (file!=null) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_exerciseWork"+filename + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            scoreExerciseDTO.setExercise_url(newFilename); //luu file xuong db
        }  else{
            if( scoreExerciseDTO.getId()!=null) {
               ScoreExercise scoreExercise = scoreExerciseRepo.findById(scoreExerciseDTO.getId()).orElse(null);
                assert scoreExercise != null;
                scoreExerciseDTO.setExercise_url(scoreExercise.getExercise_url());
            }else {
                scoreExerciseDTO.setExercise_url(null);
            }
        }
        exerciseService.submitWork(scoreExerciseDTO);
    }
}
