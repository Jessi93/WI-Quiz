package studiduell.repository;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import studiduell.model.FrageEntity;
import studiduell.model.KategorieEntity;

public interface FrageRepository extends JpaRepository<FrageEntity, Integer> {
	//TODO does it do what it should do?
	//TODO used?
	Integer countFindByKategorieName(KategorieEntity category);
	
	//TODO used?
	Page<FrageEntity> findByKategorieName(KategorieEntity category, Pageable pageable);
}
