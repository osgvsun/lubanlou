package net.gvsun.feign;

import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.datashare.external.shareddata.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@FeignClient(value = "datashare", path = "/datashare")
public interface DataShareFeign {

    @GetMapping(value = "/openapi/getSchoolAcademyList")
    Result<List<SchoolAcademyDTO>> getSchoolAcademyList();

    @GetMapping(value = "/openapi/getSchoolMajorList")
    Result<List<SchoolMajorDTO>> getSchoolMajorList();

    @GetMapping(value = "/openapi/getSchoolClassList")
    Result<List<SchoolClassDTO>> getSchoolClassList();

    @GetMapping(value = "/openapi/getSchoolAcademyInfoByUserName")
    Result<SchoolAcademyDTO> getSchoolAcademyInfoByUserName(@RequestParam(value = "username") String username);

    @PostMapping(value = "/shared/registerUser")
    Result<String> registerUser(@RequestBody List<UserDTO> userDTOList);

    @PostMapping(value = "/shared/shareUser")
    Result<String> shareUser(@RequestBody List<UserDTO> list);

    @GetMapping(value = "/openapi/getSchoolTimeListByParam")
    LayTableVO<List<SchoolTimeDTO>> getSchoolTimeListByParam(@RequestParam(value = "termId",required = false) Integer termId,
                                                      @RequestParam(value = "termNumber",required = false) String termNumber,
                                                      @RequestParam(value = "campusNumber",required = false) String campusNumber);
    @GetMapping(value = "/openapi/getDictionaryList")
    LayTableVO<List<DictionaryDTO>> getDictionaryList(@RequestParam(value = "page") Integer page, @RequestParam(value = "limit") Integer limit,
                                                      @RequestParam(value = "search") String search,@RequestParam(value = "dictionaryType",required = false) String dictionaryType);

    @GetMapping(value = "/openapi/getSchoolDepartmentList")
    LayTableVO<List<SchoolDepartmentDTO>> getSchoolDepartmentList(@RequestParam(value = "page") Integer page,
                                                                  @RequestParam(value = "limit") Integer limit);
}
