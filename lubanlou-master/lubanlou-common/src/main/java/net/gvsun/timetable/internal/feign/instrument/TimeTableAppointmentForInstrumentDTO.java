package net.gvsun.timetable.internal.feign.instrument;

import lombok.Data;

@Data
public class TimeTableAppointmentForInstrumentDTO {
    private String date;
    private String startTime;
    private String endTime;

    public TimeTableAppointmentForInstrumentDTO(String date, String startTime, String endTime) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
