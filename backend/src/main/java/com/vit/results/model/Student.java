package com.vit.results.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;
import java.util.HashMap;

@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String name;
    private String rollNo;
    private Map<String, Integer> mse = new HashMap<>();
    private Map<String, Integer> ese = new HashMap<>();
    private Map<String, Double> subjectTotal = new HashMap<>();
    private double overallPercentage;
    private String result; // PASS / FAIL

    public Student() {}

    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public Map<String, Integer> getMse() { return mse; }
    public void setMse(Map<String, Integer> mse) { this.mse = mse; }

    public Map<String, Integer> getEse() { return ese; }
    public void setEse(Map<String, Integer> ese) { this.ese = ese; }

    public Map<String, Double> getSubjectTotal() { return subjectTotal; }
    public void setSubjectTotal(Map<String, Double> subjectTotal) { this.subjectTotal = subjectTotal; }

    public double getOverallPercentage() { return overallPercentage; }
    public void setOverallPercentage(double overallPercentage) { this.overallPercentage = overallPercentage; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
}
