package de.dhbw.studiduell.db.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import de.dhbw.studiduell.db.entity.id.KategorienfilterId;

@Entity
@Table(name="Kategorienfilter")
@IdClass(KategorienfilterId.class)
public class KategorienfilterEntity {
	@Id
	private String benutzername;
	@Id
	private String kategorie_name;
	
	private boolean kategorieAusgewaehlt_Check = true /* default value */;
	
	public KategorienfilterEntity() {}
	
	/**
	 * Creates a new individual category filter
	 * that is enabled.
	 * 
	 * @param benutzername the nick
	 * @param kategorie_name the category name
	 */
	public KategorienfilterEntity(String benutzername, String kategorie_name) {
		this.benutzername = benutzername;
		this.kategorie_name = kategorie_name;
	}

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
