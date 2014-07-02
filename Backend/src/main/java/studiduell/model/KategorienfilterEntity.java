package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import studiduell.model.id.KategorienfilterEntityPk;

@Entity
@IdClass(KategorienfilterEntityPk.class)
@Table(name = "Kategorienfilter")
public class KategorienfilterEntity {
	
	public KategorienfilterEntity() {
	}

	public KategorienfilterEntity(UserEntity benutzername,
			KategorieEntity kategorieName, boolean kategorieAusgewaehltCheck) {
		this.benutzername = benutzername;
		this.kategorieName = kategorieName;
		this.kategorieAusgewaehltCheck = kategorieAusgewaehltCheck;
	}

	@Id
	@OneToOne
	@JoinColumn(name = "benutzername", unique = true, nullable = false, referencedColumnName = "benutzername")
	@JsonIgnore
	private UserEntity benutzername;
	
	@Id
	@OneToOne
	@JoinColumn(name = "kategorieName", referencedColumnName = "name")
	private KategorieEntity kategorieName;
	
	@Column(name = "kategorieAusgewaehltCheck", nullable = false)
	private boolean kategorieAusgewaehltCheck = true;

	public UserEntity getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(UserEntity benutzername) {
		this.benutzername = benutzername;
	}

	public KategorieEntity getKategorieName() {
		return kategorieName;
	}

	public void setKategorieName(KategorieEntity kategorieName) {
		this.kategorieName = kategorieName;
	}

	public boolean isKategorieAusgewaehltCheck() {
		return kategorieAusgewaehltCheck;
	}

	public void setKategorieAusgewaehltCheck(boolean kategorieAusgewaehltCheck) {
		this.kategorieAusgewaehltCheck = kategorieAusgewaehltCheck;
	}
	
	@Override
	public String toString() {
		return kategorieName.getName(); //XXX
	}
}
