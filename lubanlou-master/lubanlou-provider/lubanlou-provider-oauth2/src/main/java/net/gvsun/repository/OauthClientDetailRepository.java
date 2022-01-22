package net.gvsun.repository;

import net.gvsun.entity.OauthClientDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OauthClientDetailRepository extends JpaRepository<OauthClientDetail, String> {
    OauthClientDetail findByClientId(String clientId);

    OauthClientDetail findByClientIdAndClientSecret(String clientId, String clientSecret);
}
