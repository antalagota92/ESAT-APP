package com.agota.esat.web.rest;

import com.agota.esat.service.WorksheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Agota on 1/14/2017.
 */
@RestController
@RequestMapping("/worksheets")
public class WorksheetResource {

    @Inject
    private WorksheetService worksheetService;

    @GetMapping("/all")
    public ResponseEntity<List<WorksheetDTO>> getAllWorksheetsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(worksheetService.findAllByUser(userId));
    }

    @PostMapping("/save")
    public ResponseEntity<WorksheetDTO> addWorksheetsEntry(@PathVariable WorksheetDTO worksheet) {
        return ResponseEntity.ok(worksheetService.saveWorksheetEntry(worksheet));
    }

}
