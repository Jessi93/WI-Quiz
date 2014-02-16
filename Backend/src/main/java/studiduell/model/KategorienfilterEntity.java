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
	
}
