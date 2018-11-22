package com.crosscode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	    public String loginPage(Model model) {
		 	System.out.println("came to controller for login");
	        return "login";
	    }
	
	/*@RequestMapping(value = "/", method = RequestMethod.GET)
    public String welcomePage(Model model) {
	 	System.out.println("came to welcome controller ");
        return "welcome";
    }*/

}
