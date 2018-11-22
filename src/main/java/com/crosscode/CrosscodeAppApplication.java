package com.crosscode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@Component("com.crosscode.*")
@SpringBootApplication
public class CrosscodeAppApplication {

	/* @Override
	   protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(CrosscodeAppApplication.class);
	    }  */
	
	public static void main(String[] args) {
		SpringApplication.run(CrosscodeAppApplication.class, args);
	}
}
