package net.gvsun.gswork.kafka;

import lombok.SneakyThrows;
import net.gvsun.datashare.external.shareddata.*;
import net.gvsun.kafka.service.SharedDataService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class SharedDataServiceImpl implements SharedDataService {

    private final Logger logger = Logger.getLogger(SharedDataServiceImpl.class.getName());


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
