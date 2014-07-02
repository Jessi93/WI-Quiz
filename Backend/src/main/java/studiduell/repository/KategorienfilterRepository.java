package studiduell.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studiduell.model.KategorienfilterEntity;
import studiduell.model.UserEntity;
import studiduell.model.id.KategorienfilterEntityPk;

public interface KategorienfilterRepository extends JpaRepository<KategorienfilterEntity, KategorienfilterEntityPk> {
	@Query("FROM KategorienfilterEntity k WHERE k.benutzername IN (:player1, :player2) GROUP BY k.kategorieName HAVING SUM(k.kategorieAusgewaehltCheck) = 2")
	Set<KategorienfilterEntity> commonCategories(@Param("player1") UserEntity player1, @Param("player2") UserEntity player2);
	
	List<KategorienfilterEntity> findByBenutzername(UserEntity username);
}
