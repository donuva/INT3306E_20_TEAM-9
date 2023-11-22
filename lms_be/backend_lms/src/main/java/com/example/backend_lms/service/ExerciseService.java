package com.example.backend_lms.service;

import com.example.backend_lms.dto.ExerciseDTO;
import com.example.backend_lms.dto.ScoreExerciseDTO;
import com.example.backend_lms.entity.Exercise;
import com.example.backend_lms.entity.ScoreExercise;
import com.example.backend_lms.exception.ExpiredDateException;
import com.example.backend_lms.exception.NotAllowedException;
import com.example.backend_lms.repo.CourseRepo;
import com.example.backend_lms.repo.ExerciseRepo;
import com.example.backend_lms.repo.ScoreExerciseRepo;
import com.example.backend_lms.repo.StudentRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.assertj.core.util.DateUtil.now;

@Service
public class ExerciseService {

    @Autowired
    ExerciseRepo exerciseRepo;

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    ScoreExerciseRepo scoreExerciseRepo;
    public ExerciseDTO convert(Exercise exercise){
        return new ModelMapper().map(exercise, ExerciseDTO.class);
    }

    @Transactional
    public void create(ExerciseDTO exerciseDTO) throws NotFoundException {
        if(courseRepo.findById(exerciseDTO.getCourse().getId()).isPresent()) {
           exerciseRepo.save(new ModelMapper().map(exerciseDTO, Exercise.class));
        }else{
            throw new NotFoundException("Không tìm thấy course");
        }
    }

    @Transactional
    public ExerciseDTO update(ExerciseDTO exerciseDTO) throws NotFoundException {
        ExerciseDTO current = convert(exerciseRepo.findById(exerciseDTO.getId()).orElse(null));
        if(current!=null) {
            exerciseDTO.setCourse(current.getCourse());
            exerciseRepo.save(new ModelMapper().map(exerciseDTO, Exercise.class));
            return new ModelMapper().map(exerciseRepo.findById(exerciseDTO.getId()),ExerciseDTO.class);
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if(exerciseRepo.findById(id).isPresent()){
            exerciseRepo.deleteById(id);
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }

    public List<ExerciseDTO> getExerciseByCourse(int course_id){
        return exerciseRepo.findByCourseId(course_id).stream().map(this::convert).collect(Collectors.toList());
    }

    public ExerciseDTO findById(int id) throws NotFoundException {
        if (exerciseRepo.findById(id).isPresent()) {
            return convert(exerciseRepo.findById(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }


    /*
    Phan nay cua hoc sinh
     */
    //them bai nop
    public void submitWork(ScoreExerciseDTO scoreExercise) throws NotFoundException, ExpiredDateException {
        if (exerciseRepo.findById(scoreExercise.getExercise().getId()).isPresent()
                && studentRepo.findById(scoreExercise.getExercise().getId()).isPresent()) {
            Exercise exercise = exerciseRepo.findById(scoreExercise.getExercise().getId()).orElse(null);
            assert exercise != null;
            if(exercise.getDeadline().after(now())) {
                scoreExercise.setGrade(null);
                scoreExerciseRepo.save(new ModelMapper().map(scoreExercise, ScoreExercise.class));
            }else{
                throw new ExpiredDateException("Quá hạn làm bài");
            }
        }else {
            throw new NotFoundException("Id học sinh hoặc bài tập không đúng");
        }
    }

    //xoa bai nop
    public void deleteWork(int id) throws NotFoundException, ExpiredDateException, NotAllowedException {
        if(scoreExerciseRepo.findById(id).isPresent()){
            if(Objects.requireNonNull(scoreExerciseRepo.findById(id).orElse(null)).getExercise().getDeadline().after(now())) {
                if(Objects.requireNonNull(scoreExerciseRepo.findById(id).orElse(null)).getGrade() == null) {
                    scoreExerciseRepo.deleteById(id);
                }else{
                    throw new NotAllowedException("Bài làm đã được chấm");
                }
            }else{
                throw new ExpiredDateException("Quá hạn làm bài");
            }
            scoreExerciseRepo.deleteById(id);
        }else{
            throw new NotFoundException("Id của bài tập không hợp lệ");
        }
    }

    //sua bai nop
    public ScoreExerciseDTO updateWork(ScoreExerciseDTO scoreExercise) throws NotFoundException, ExpiredDateException {
        if (exerciseRepo.findById(scoreExercise.getExercise().getId()).isPresent()
                && studentRepo.findById(scoreExercise.getExercise().getId()).isPresent()
                && scoreExerciseRepo.findById(scoreExercise.getId()).isPresent()) {
            Exercise exercise = exerciseRepo.findById(scoreExercise.getExercise().getId()).orElse(null);

            assert exercise != null;
            if(exercise.getDeadline().after(now())) {
                scoreExerciseRepo.save(new ModelMapper().map(scoreExercise, ScoreExercise.class));
                return new ModelMapper().map(scoreExerciseRepo.findById(scoreExercise.getId()), ScoreExerciseDTO.class);
            }else{
                throw new ExpiredDateException("Quá hạn làm bài");
            }
        } else {
            throw new NotFoundException("Id học sinh hoặc bài tập không đúng");
        }
    }

    /*
    Phan nay cua giao vien
     */
    //them, sua diem
    public void addScore(int scoreExercise_id, Double grade) throws NotFoundException {
        if(scoreExerciseRepo.findById(scoreExercise_id).isPresent()){
            Objects.requireNonNull(scoreExerciseRepo.findById(scoreExercise_id).orElse(null)).setGrade(grade);
        }else{
            throw new NotFoundException("Id bài tập không đúng");
        }
    }

    public void deleteScore(int scoreExercise_id) throws NotFoundException {
        if(scoreExerciseRepo.findById(scoreExercise_id).isPresent()){
            Objects.requireNonNull(scoreExerciseRepo.findById(scoreExercise_id).orElse(null)).setGrade(null);
        }else{
            throw new NotFoundException("Id bài tập không đúng");
        }
    }


}
