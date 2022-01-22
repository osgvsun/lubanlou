package net.gvsun.teacherinformationcenter.repository;

import net.gvsun.teacherinformationcenter.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadFileJAP extends JpaRepository<UploadFile, Integer> {
}
