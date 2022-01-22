package net.gvsun.gsexam.kafka;

import lombok.SneakyThrows;
import net.gvsun.datashare.external.shareddata.*;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.kafka.service.SharedDataService;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.logging.Logger;

@Service
public class SharedDataServiceImpl implements SharedDataService {

    private final Logger logger = Logger.getLogger(SharedDataServiceImpl.class.getName());

    private final UserJPA userJPA;
    private final SchoolAcademyJPA schoolAcademyJPA;
    private final SchoolTermJPA schoolTermJPA;
    private final AuthorityJPA authorityJPA;
    private final SchoolWeekJPA schoolWeekJPA;
    private final SystemCampusJPA systemCampusJPA;
    private final SystemTimeJPA systemTimeJPA;
    private final SystemBuildJPA systemBuildJPA;
    private final SchoolMajorJPA schoolMajorJPA;
    private final SchoolClassesJPA schoolClassesJPA;
    private final SchoolDeviceJPA schoolDeviceJPA;

    private final SimpleDateFormat simpleDateFormat;
    private final SimpleDateFormat dateFormat;

    public SharedDataServiceImpl(UserJPA userJPA,
                                 SchoolAcademyJPA schoolAcademyJPA,
                                 SchoolTermJPA schoolTermJPA,
                                 AuthorityJPA authorityJPA,
                                 SchoolWeekJPA schoolWeekJPA,
                                 SystemTimeJPA systemTimeJPA,
                                 SystemBuildJPA systemBuildJPA,
                                 SchoolMajorJPA schoolMajorJPA,
                                 SchoolDeviceJPA schoolDeviceJPA,
                                 SchoolClassesJPA schoolClassesJPA,
                                 SystemCampusJPA systemCampusJPA) {
        this.userJPA = userJPA;
        this.schoolAcademyJPA = schoolAcademyJPA;
        this.schoolTermJPA = schoolTermJPA;
        this.authorityJPA = authorityJPA;
        this.schoolWeekJPA = schoolWeekJPA;
        this.systemCampusJPA = systemCampusJPA;
        this.simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        this.dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.systemTimeJPA = systemTimeJPA;
        this.systemBuildJPA = systemBuildJPA;
        this.schoolMajorJPA = schoolMajorJPA;
        this.schoolClassesJPA = schoolClassesJPA;
        this.schoolDeviceJPA = schoolDeviceJPA;
    }

    @Override
    public void insertUser(List<UserDTO> users) {

    }

    @Override
    public void insertUserCard(List<UserCardDTO> userCardDTOList) {

    }

    @Override
    public void insertSchoolAcademy(List<SchoolAcademyDTO> schoolAcademyDTOList) {

    }

    @SneakyThrows
    @Override
    public void insertSchoolTerm(List<SchoolTermDTO> schoolTermDTOList) {

    }

    @SneakyThrows
    @Override
    public void insertSchoolWeek(List<SchoolWeekDTO> schoolWeekDTOList) {

    }

    @SneakyThrows
    @Override
    public void insertSchoolCampus(List<SchoolCampusDTO> schoolCampusDTOList) {

    }

    @SneakyThrows
    @Override
    public void insertSchoolTime(List<SchoolTimeDTO> schoolTimeDTOList) {

    }

    @Override
    public void insertSchoolBuild(List<SchoolBuildDTO> schoolBuildDTOList) {

    }

    @Override
    public void insertSchoolSubject(List<SchoolSubjectDTO> schoolSubjectDTOList) {
        logger.info("School Subject");
    }

    @Override
    public void insertSchoolMajor(List<SchoolMajorDTO> schoolMajorDTOList) {

    }

    @Override
    public void insertSchoolClass(List<SchoolClassDTO> schoolClassDTOList) {

    }

    @Override
    public void insertSchoolRoom(List<SchoolRoomDTO> schoolRoomDTOList) {

    }

    @SneakyThrows
    @Override
    public void insertSchoolDevice(List<SchoolDeviceDTO> schoolDeviceDTOList) {

    }

    @Override
    public void insertDictionary(List<DictionaryDTO> dictionaryDTOList) {

    }

    @Override
    public void updateUser(UserDTO user) {

    }

    @Override
    public void updateUserCard(UserCardDTO userCardDTO) {

    }

    @Override
    public void updateSchoolAcademy(SchoolAcademyDTO schoolAcademyDTO) {

    }

    @Override
    public void updateSchoolTerm(SchoolTermDTO schoolTermDTO) {

    }

    @Override
    public void updateSchoolWeek(SchoolWeekDTO schoolWeekDTO) {

    }

    @Override
    public void updateSchoolCampus(SchoolCampusDTO schoolCampusDTO) {

    }

    @Override
    public void updateSchoolTime(SchoolTimeDTO schoolTimeDTO) {

    }

    @Override
    public void updateSchoolBuild(SchoolBuildDTO schoolBuildDTO) {

    }

    @Override
    public void updateSchoolSubject(SchoolSubjectDTO schoolSubjectDTO) {

    }

    @Override
    public void updateSchoolMajor(SchoolMajorDTO schoolMajorDTO) {

    }

    @Override
    public void updateSchoolClass(SchoolClassDTO schoolClassDTO) {

    }

    @Override
    public void updateSchoolRoom(SchoolRoomDTO schoolRoomDTO) {

    }

    @Override
    public void updateSchoolDevice(SchoolDeviceDTO schoolDeviceDTO) {

    }

    @Override
    public void updateDictionary(DictionaryDTO dictionaryDTO) {

    }
    @Override
    public void deleteUser(List<UserDTO> users) {

    }

    @Override
    public void deleteUserCard(List<UserCardDTO> userCardDTOList) {

    }

    @Override
    public void deleteSchoolAcademy(List<SchoolAcademyDTO> schoolAcademyDTOList) {

    }

    @Override
    public void deleteSchoolTerm(List<SchoolTermDTO> schoolTermDTOList) {

    }

    @Override
    public void deleteSchoolWeek(List<SchoolWeekDTO> schoolWeekDTOList) {

    }

    @Override
    public void deleteSchoolCampus(List<SchoolCampusDTO> schoolCampusDTOList) {

    }

    @Override
    public void deleteSchoolTime(List<SchoolTimeDTO> schoolTimeDTOList) {

    }

    @Override
    public void deleteSchoolBuild(List<SchoolBuildDTO> schoolBuildDTOList) {

    }

    @Override
    public void deleteSchoolSubject(List<SchoolSubjectDTO> schoolSubjectDTOList) {

    }

    @Override
    public void deleteSchoolMajor(List<SchoolMajorDTO> schoolMajorDTOList) {

    }

    @Override
    public void deleteSchoolClass(List<SchoolClassDTO> schoolClassDTOList) {

    }

    @Override
    public void deleteSchoolRoom(List<SchoolRoomDTO> schoolRoomDTOList) {

    }

    @Override
    public void deleteSchoolDevice(List<SchoolDeviceDTO> schoolDeviceDTOList) {

    }

    @Override
    public void deleteDictionary(List<DictionaryDTO> dictionaryDTOList) {

    }

}
