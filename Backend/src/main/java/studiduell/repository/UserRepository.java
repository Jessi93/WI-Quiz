package studiduell.repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studiduell.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
	@Query("SELECT u.benutzername FROM UserEntity u WHERE u.benutzername LIKE :pattern")
	Page<String> roughSearch(@Param("pattern") String pattern, Pageable pageable);
	
	@Query("FROM UserEntity u WHERE u.benutzername != :user AND u.letzteAktivitaet > :lstAct")
	List<UserEntity> findOthersActiveAfter(@Param("user") String benutzername,
			@Param("lstAct") Timestamp letzteAktivitaet);
}
