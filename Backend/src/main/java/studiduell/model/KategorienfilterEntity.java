package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import studiduell.model.id.KategorienfilterEntityPk;

@Entity
@IdClass(KategorienfilterEntityPk.class)
@Table(name = "Kategorienfilter")
public class KategorienfilterEntity {
	
	public KategorienfilterEntity() {
	}

	public KategorienfilterEntity(String benutzername, String kategorie_name,
			boolean kategorieAusgewaehlt_Check) {
		this.benutzername = benutzername;
		this.kategorie_name = kategorie_name;
		this.kategorieAusgewaehlt_Check = kategorieAusgewaehlt_Check;
	}

	@Id
	@Column(name = "benutzername", unique = true, nullable = false)
	private String benutzername;
	
	@Id
	@Column(name = "kategorie_name")
	private String kategorie_name;
	
	@Column(name = "kategorieAusgewaehlt_Check", nullable = false)
	private boolean kategorieAusgewaehlt_Check = true;

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getKategorie_name() {
		return kategorie_name;
	}

	public void setKategorie_name(String kategorie_name) {
		this.kategorie_name = kategorie_name;
	}

	public boolean isKategorieAusgewaehlt_Check() {
		return kategorieAusgewaehlt_Check;
	}

	public void setKategorieAusgewaehlt_Check(boolean kategorieAusgewaehlt_Check) {
		this.kategorieAusgewaehlt_Check = kategorieAusgewaehlt_Check;
	}
}
