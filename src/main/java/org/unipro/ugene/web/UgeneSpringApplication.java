package org.unipro.ugene.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UgeneSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(UgeneSpringApplication.class, args);
	}
}
