package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studiduell.model.SpielEntity;
import studiduell.model.SpielstatusEntity;
import studiduell.model.UserEntity;

public interface SpielRepository extends JpaRepository<SpielEntity, Integer> {
	@Query("SELECT COUNT(*) FROM SpielEntity s WHERE ((s.spieler1 = :user AND s.spieler2 = :opponent) OR (s.spieler1 = :opponent AND s.spieler2 = :user)) AND s.spielstatus_name IN (:status)")
	Integer getGamesWithOpponent(@Param("user") UserEntity user,
			@Param("opponent") UserEntity opponent, @Param("status") List<SpielstatusEntity> spielstatus);
}
