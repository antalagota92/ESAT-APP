package com.agota.esat.repository;

import com.agota.esat.domain.User;
import com.agota.esat.domain.Worksheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by Agota on 1/14/2017.
 */
public interface WorksheetRepository extends JpaRepository<Worksheet, Long> {

    List<Worksheet> findAllByUser(User user);

}
