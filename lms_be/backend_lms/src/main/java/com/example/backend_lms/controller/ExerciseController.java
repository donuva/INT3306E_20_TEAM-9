package com.example.backend_lms.controller;

import com.example.backend_lms.dto.ExerciseDTO;
import com.example.backend_lms.dto.ScoreExerciseDTO;
import com.example.backend_lms.exception.ExpiredDateException;
import com.example.backend_lms.exception.NotAllowedException;
import com.example.backend_lms.service.ExerciseService;
import com.example.backend_lms.service.ScoreService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class ExerciseController {
    //TODO: CRUD exercise
    //Find By Id
    //TODO: Nop bai

    @Autowired
    ExerciseService exerciseService;

    @Autowired
    ScoreService scoreService;

    @Value("${upload.folder}")
    String Upload_Folder;

    //CRUD exercise
    @PostMapping("/teacher/exercise/create")
    @ResponseStatus(HttpStatus.OK)
    public void createExercise(@RequestBody ExerciseDTO exerciseDTO) throws NotFoundException {
        exerciseService.create(exerciseDTO);
    }

    @GetMapping("/exercise/{id}")
    public ResponseEntity<ExerciseDTO> getExercise(@PathVariable("id") int id) throws NotFoundException {
        return ResponseEntity.ok(exerciseService.findById(id));
    }

    @PutMapping("teacher/exercise/update")
    public ResponseEntity<ExerciseDTO> updateExercise(ExerciseDTO exerciseDTO) throws NotFoundException {
        return ResponseEntity.ok(exerciseService.update(exerciseDTO));
    }

    @DeleteMapping("/teacher/exercise/delete")
    public void deleteCourse(@RequestParam("id") int id) throws NotFoundException {
        exerciseService.delete(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/student/exercise/submit")
    public void submitExercise(@ModelAttribute ScoreExerciseDTO scoreExerciseDTO) throws IOException, ExpiredDateException, NotFoundException {
        if (!scoreExerciseDTO.getFile().isEmpty()) {
            String filename = scoreExerciseDTO.getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_exerciseWork" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            scoreExerciseDTO.getFile().transferTo(saveFile);
            scoreExerciseDTO.setExercise_url(newFilename); //luu file xuong db
        }
        exerciseService.submitWork(scoreExerciseDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/student/exercise/submit")
    public void deleteWork(@RequestParam("id") int id) throws ExpiredDateException, NotAllowedException, NotFoundException {
        exerciseService.deleteWork(id);
    }
}
