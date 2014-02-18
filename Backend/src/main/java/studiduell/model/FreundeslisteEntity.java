package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import studiduell.model.id.FreundeslisteEntityPk;

@Entity
@IdClass(FreundeslisteEntityPk.class)
@Table(name = "freundesliste")
public class FreundeslisteEntity {
	
	@Id
	@Column(name = "benutzername", unique = true, nullable = false)
	private String benutzername;
	
	@Id
	@Column(name = "befreundetMit", unique = true, nullable = false)
	private String befreundetMit;
	
	public FreundeslisteEntity() {
	}

	public FreundeslisteEntity(String benutzername, String befreundetMit) {
		this.benutzername = benutzername;
		this.befreundetMit = befreundetMit;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getBefreundetMit() {
		return befreundetMit;
	}

	public void setBefreundetMit(String befreundetMit) {
		this.befreundetMit = befreundetMit;
	}
}
