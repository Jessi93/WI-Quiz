package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.KategorieEntity;

public interface KategorieRepository extends JpaRepository<KategorieEntity, String> {
	// no new methods here
}
