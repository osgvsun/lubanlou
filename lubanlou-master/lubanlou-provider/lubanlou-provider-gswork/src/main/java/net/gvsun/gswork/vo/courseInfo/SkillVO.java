package net.gvsun.gswork.vo.courseInfo;

/**************************************************************************
 * Description: 技能-实验项目VO
 *
 * @author:Hezhaoyi
 * @date:2020-3-4
 **************************************************************************/
public class SkillVO {
    /**
     * 项目id
     */
    private String skillId;
    /**
     * 项目名称
     */
    private String skillName;

    public String getSkillId() {
        return skillId;
    }

    public void setSkillId(String skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}
