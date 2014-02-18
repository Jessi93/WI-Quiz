package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.KategorienfilterEntity;
import studiduell.model.id.KategorienfilterEntityPk;

public interface KategorienfilterRepository extends JpaRepository<KategorienfilterEntity, KategorienfilterEntityPk> {
	// no new methods here
}
