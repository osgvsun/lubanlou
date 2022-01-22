package net.gvsun.repository;

import net.gvsun.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByAccessToken(String accessToken);

    Token findByRefreshToken(String refreshToken);
}
