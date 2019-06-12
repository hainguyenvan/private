package com.dao;

import com.models.AccountModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDAO extends JpaRepository<AccountModel, Long> {

}