package com.services;

import com.dao.AccountDAO;
import com.models.AccountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountDAO accountDAO;

    public AccountModel insert(AccountModel account) {
         return accountDAO.save(account);
    }
}
