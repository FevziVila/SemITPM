package backend.gitops.controller;

import backend.gitops.service.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/")
@CrossOrigin("*")
public class Controller {

    private final Service service;
    
    @GetMapping("test")
    public String returnString() {
        return "Hello";
    }

    
    @GetMapping("search")
    public ResponseEntity<?> getTickers(@RequestParam String args) {
        return ResponseEntity.ok(service.returnTickers(args));
    }

}