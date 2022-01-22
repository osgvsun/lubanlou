package net.gvsun.timetable.internal.labroom;

import lombok.Data;
import net.gvsun.datashare.external.shareddata.SchoolTermDTO;
import net.gvsun.timetable.internal.cdictionary.CDictionaryDTO;
import net.gvsun.timetable.internal.user.UserDTO;

import java.io.Serializable;
import java.util.Date;

@Data
public class LabRoomTrainingDTO implements Serializable {
    Integer id;
    String address;
    UserDTO user;
    String content;
    Date time;
    Integer number;
    Integer joinNumber;
    SchoolTermDTO schoolTerm;
    Integer status;
    String passRate;
    private CDictionaryDTO cDictionary;
}
