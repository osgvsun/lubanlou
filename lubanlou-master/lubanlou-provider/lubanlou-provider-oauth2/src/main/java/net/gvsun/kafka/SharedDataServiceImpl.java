package net.gvsun.kafka;

import net.gvsun.datashare.external.shareddata.*;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.entity.User;
import net.gvsun.entity.UserForDataSource;
import net.gvsun.kafka.service.SharedDataService;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.datasource.DatasourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SharedDataServiceImpl implements SharedDataService {

    @Autowired
    private JdbcOperations jdbcOperations;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DatasourceService datasourceService;
    @Autowired
    private RedisTemplate<String, User> userRedisTemplate;

    @Override
    public void insertUser(List<UserDTO> users) {
        System.out.println("datashare导入用户" + users);
        for (UserDTO u : users) {

            userRedisTemplate.delete(ClientDatabaseContextHolder.getClientDatabase() + "-" + u.getUsername());
            User user = userRepository.findByUsername(u.getUsername());
            if (Objects.isNull(user)) {
                user = new User();
                user.setUsername(u.getUsername());
                user.setPassword(u.getPassword());
                user.setEnabled(true);
                user.setEnterprise(false);
                user.setFirstLogin(true);
            }
            user.setCname(u.getCname());
            user.setPhone(u.getPhone());
            user.setEmail(u.getMail());
            userRepository.save(user);

            UserForDataSource userForDataSource = new UserForDataSource();
            user = userRepository.findByUsername(user.getUsername());
            userForDataSource.setUsername(user.getUsername());
            userForDataSource.setPassword(user.getPassword());
            userForDataSource.setCname(user.getCname());
            userForDataSource.setPhone(user.getPhone());
            userForDataSource.setEnabled(true);
            userForDataSource.setEmail(user.getEmail());

            String schoolName = ClientDatabaseContextHolder.getClientDatabase();
            schoolName = schoolName == null ? datasourceService.getDefaultDataSource().getSchoolName() : schoolName;
            userForDataSource.setSchoolName(schoolName);
            //把用户写入redis
            userRedisTemplate.opsForHash().put(DatasourceService.FULL_AMOUNT_OF_USER,
                    userForDataSource.getSchoolName() + "-" + userForDataSource.getUsername(),
                    user);
        }
    }

    @Override
    public void insertUserCard(List<UserCardDTO> userCardDTOList) {

    }

    @Override
    public void insertSchoolAcademy(List<SchoolAcademyDTO> schoolAcademyDTOList) {

    }

    @Override
    public void insertSchoolTerm(List<SchoolTermDTO> schoolTermDTOList) {

    }

    @Override
    public void insertSchoolWeek(List<SchoolWeekDTO> schoolWeekDTOList) {

    }

    @Override
    public void insertSchoolCampus(List<SchoolCampusDTO> schoolCampusDTOList) {

    }

    @Override
    public void insertSchoolTime(List<SchoolTimeDTO> schoolTimeDTOList) {

    }

    @Override
    public void insertSchoolBuild(List<SchoolBuildDTO> schoolBuildDTOList) {

    }

    @Override
    public void insertSchoolSubject(List<SchoolSubjectDTO> schoolSubjectDTOList) {

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

    @Override
    public void insertSchoolDevice(List<SchoolDeviceDTO> schoolDeviceDTOList) {

    }

    @Override
    public void insertDictionary(List<DictionaryDTO> dictionaryDTOList) {

    }

    @Override
    public void updateUser(UserDTO userDTO) {
        System.out.println("datashare修改用户" + userDTO);

        User user = userRepository.findByUsername(userDTO.getUsername());
        if (Objects.nonNull(user)) {
            user.setCname(userDTO.getCname());
            user.setEnabled(true);
            user.setPhone(userDTO.getPhone());
            user.setEmail(userDTO.getMail());
            userRepository.save(user);

            UserForDataSource userForDataSource = new UserForDataSource();
            user = userRepository.findByUsername(user.getUsername());
            userForDataSource.setUsername(user.getUsername());
            userForDataSource.setPassword(user.getPassword());
            userForDataSource.setCname(user.getCname());
            userForDataSource.setPhone(user.getPhone());
            userForDataSource.setEnabled(true);
            userForDataSource.setEmail(user.getEmail());

            String schoolName = ClientDatabaseContextHolder.getClientDatabase();
            schoolName = schoolName == null ? datasourceService.getDefaultDataSource().getSchoolName() : schoolName;
            userForDataSource.setSchoolName(schoolName);
            //把用户写入redis
            userRedisTemplate.opsForHash().put(DatasourceService.FULL_AMOUNT_OF_USER,
                    userForDataSource.getSchoolName() + "-" + userForDataSource.getUsername(),
                    user);
        }
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
    public void deleteUser(List<UserDTO> list) {

    }

    @Override
    public void deleteUserCard(List<UserCardDTO> list) {

    }

    @Override
    public void deleteSchoolAcademy(List<SchoolAcademyDTO> list) {

    }

    @Override
    public void deleteSchoolTerm(List<SchoolTermDTO> list) {

    }

    @Override
    public void deleteSchoolWeek(List<SchoolWeekDTO> list) {

    }

    @Override
    public void deleteSchoolCampus(List<SchoolCampusDTO> list) {

    }

    @Override
    public void deleteSchoolTime(List<SchoolTimeDTO> list) {

    }

    @Override
    public void deleteSchoolBuild(List<SchoolBuildDTO> list) {

    }

    @Override
    public void deleteSchoolSubject(List<SchoolSubjectDTO> list) {

    }

    @Override
    public void deleteSchoolMajor(List<SchoolMajorDTO> list) {

    }

    @Override
    public void deleteSchoolClass(List<SchoolClassDTO> list) {

    }

    @Override
    public void deleteSchoolRoom(List<SchoolRoomDTO> list) {

    }

    @Override
    public void deleteSchoolDevice(List<SchoolDeviceDTO> list) {

    }

    @Override
    public void deleteDictionary(List<DictionaryDTO> list) {

    }

}
