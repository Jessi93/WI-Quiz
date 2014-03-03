package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import studiduell.model.id.KategorienfilterEntityPk;

@Entity
@IdClass(KategorienfilterEntityPk.class)
@Table(name = "kategorienfilter")
public class KategorienfilterEntity {
	
	public KategorienfilterEntity() {
	}

	public KategorienfilterEntity(String benutzername, String kategorieName,
			boolean kategorieAusgewaehltCheck) {
		this.benutzername = benutzername;
		this.kategorieName = kategorieName;
		this.kategorieAusgewaehltCheck = kategorieAusgewaehltCheck;
	}

	@Id
	@Column(name = "benutzername", unique = true, nullable = false)
	private String benutzername;
	
	@Id
	@Column(name = "kategorie_name")
	private String kategorieName;
	
	@Column(name = "kategorieAusgewaehlt_Check", nullable = false)
	private boolean kategorieAusgewaehltCheck = true;

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getKategorieName() {
		return kategorieName;
	}

	public void setKategorieName(String kategorieName) {
		this.kategorieName = kategorieName;
	}

	public boolean isKategorieAusgewaehltCheck() {
		return kategorieAusgewaehltCheck;
	}

	public void setKategorieAusgewaehltCheck(boolean kategorieAusgewaehltCheck) {
		this.kategorieAusgewaehltCheck = kategorieAusgewaehltCheck;
	}
}
