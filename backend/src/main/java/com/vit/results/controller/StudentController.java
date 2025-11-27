package com.vit.results.controller;

import com.vit.results.model.Student;
import com.vit.results.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
    private final StudentService service;
    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student s) {
        // Expect s.name, s.rollNo, s.mse (map), s.ese (map)
        Student saved = service.addStudent(s);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{roll}")
    public ResponseEntity<?> getByRoll(@PathVariable String roll) {
        Optional<Student> st = service.getByRoll(roll);
        if (st.isPresent()) return ResponseEntity.ok(st.get());
        else return ResponseEntity.status(404).body("Student with roll " + roll + " not found");
    }
}
