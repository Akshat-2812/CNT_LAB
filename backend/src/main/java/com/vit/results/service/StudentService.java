package com.vit.results.service;

import com.vit.results.model.Student;
import com.vit.results.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student addStudent(Student s) {
        // subjects: CNT, ANN, CC, DAA
        String[] subs = {"CNT","ANN","CC","DAA"};
        double totalSum = 0.0;
        boolean allPass = true;
        for (String sub : subs) {
            Integer mse = s.getMse().getOrDefault(sub, 0);
            Integer ese = s.getEse().getOrDefault(sub, 0);
            double subjectTotal = mse * 0.3 + ese * 0.7;
            s.getSubjectTotal().put(sub, subjectTotal);
            totalSum += subjectTotal;
            // passing criteria: subject total >= 40
            if (subjectTotal < 40.0) {
                allPass = false;
            }
        }
        double overallPercentage = totalSum / subs.length; // average percentage
        s.setOverallPercentage(Math.round(overallPercentage * 100.0)/100.0);
        s.setResult(allPass ? "PASS" : "FAIL");
        return repo.save(s);
    }

    public Optional<Student> getByRoll(String roll) {
        return repo.findByRollNo(roll);
    }
}
