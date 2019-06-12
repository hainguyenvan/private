package com.controllers;

import com.models.AccountModel;
import com.services.AccountService;
import com.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/page1")
    public String hello() {
        return "page 1!";
    }

    @RequestMapping(value = "/accounts", method = RequestMethod.POST)
    public String insert(@RequestBody AccountModel account) {
        AccountModel insertAcc = accountService.insert(account);
        return Utils.buildResponse(200,"Insert successfully", insertAcc);
    }
}
