package com.agota.esat.web.rest;

import com.agota.esat.domain.Day;

import java.io.Serializable;

/**
 * Created by Agota on 1/17/2017.
 */
public class WorksheetDTO implements Serializable {

    private Long id;

    private Long userId;

    private Day day;

    private Integer startHour;

    private Integer endHour;

    public WorksheetDTO() {
    }

    public WorksheetDTO(Long userId, Day day, Integer startHour, Integer endHour) {
        this.userId = userId;
        this.day = day;
        this.startHour = startHour;
        this.endHour = endHour;
    }

    public WorksheetDTO(Long id, Long userId, Day day, Integer startHour, Integer endHour) {
        this.id = id;
        this.userId = userId;
        this.day = day;
        this.startHour = startHour;
        this.endHour = endHour;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public Integer getStartHour() {
        return startHour;
    }

    public void setStartHour(Integer startHour) {
        this.startHour = startHour;
    }

    public Integer getEndHour() {
        return endHour;
    }

    public void setEndHour(Integer endHour) {
        this.endHour = endHour;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WorksheetDTO that = (WorksheetDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (userId != null ? !userId.equals(that.userId) : that.userId != null) return false;
        if (day != that.day) return false;
        if (startHour != null ? !startHour.equals(that.startHour) : that.startHour != null) return false;
        return endHour != null ? endHour.equals(that.endHour) : that.endHour == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + (day != null ? day.hashCode() : 0);
        result = 31 * result + (startHour != null ? startHour.hashCode() : 0);
        result = 31 * result + (endHour != null ? endHour.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "WorksheetDTO{" +
            "id=" + id +
            ", userId=" + userId +
            ", day=" + day +
            ", startHour=" + startHour +
            ", endHour=" + endHour +
            '}';
    }
}
