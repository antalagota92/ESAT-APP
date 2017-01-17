package com.agota.esat.service;

import com.agota.esat.domain.User;
import com.agota.esat.domain.Worksheet;
import com.agota.esat.repository.UserRepository;
import com.agota.esat.repository.WorksheetRepository;
import com.agota.esat.web.rest.WorksheetDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Agota on 1/14/2017.
 */
@Service
@Transactional
public class WorksheetService {

    @Inject
    private WorksheetRepository worksheetRepository;
    @Inject
    private UserRepository userRepository;


    public List<WorksheetDTO> findAllByUser(Long userId) {
        return worksheetRepository.findAllByUser(new User(userId)).stream().map(worksheet -> convertToDto(worksheet)).collect(Collectors.toList());
    }

    public WorksheetDTO saveWorksheetEntry(WorksheetDTO dto) {

        final Worksheet worksheet = new Worksheet();
        worksheet.setDay(dto.getDay());
        worksheet.setEndHour(dto.getEndHour());
        worksheet.setStartHour(dto.getStartHour());
        worksheet.setUser(userRepository.findOne(dto.getUserId()));

        final Worksheet savedWorksheet = worksheetRepository.save(worksheet);
        return convertToDto(savedWorksheet);
    }

    private WorksheetDTO convertToDto(Worksheet savedWorksheet) {
        return new WorksheetDTO(savedWorksheet.getId(), savedWorksheet.getUser().getId(), savedWorksheet.getDay(), savedWorksheet.getStartHour(), savedWorksheet.getEndHour());
    }
}
