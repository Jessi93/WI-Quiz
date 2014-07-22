package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.FrageEntity;
import studiduell.model.KategorieEntity;

public interface FrageRepository extends JpaRepository<FrageEntity, Integer> {
	
	List<FrageEntity> findByKategorieNameAndFlagFrageValidiertIsTrue(KategorieEntity category);
}
