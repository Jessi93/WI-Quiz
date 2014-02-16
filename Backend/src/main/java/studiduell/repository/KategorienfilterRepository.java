package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.KategorienfilterEntity;

public interface KategorienfilterRepository extends JpaRepository<KategorienfilterEntity, String> {
	// no new methods here
}
